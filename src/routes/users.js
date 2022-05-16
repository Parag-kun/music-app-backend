import { Router } from 'express'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import User from '../models/user.js'
import Song from '../models/song.js'
import Playlist from '../models/playlist.js'
import Artist from '../models/artist.js'

import { validateUserRegister, validateUserLogin } from '../utils/validation.js'
import { checkUserAuth } from '../utils/auth.js'


const router = Router()

const generateToken = user => jwt.sign({ id: user._id, email: user.email}, process.env.SECRET_KEY)

router.post('/login', validateUserLogin, (req, res) => {
    res.status(200).json({ message: 'User logged in', token: generateToken(res.user), user: res.user })
})

router.post('/register', validateUserRegister, async (req, res) => {
    let newUser

    try {
        req.body.password = await bcryptjs.hash(req.body.password, 10)
        const user = new User(req.body)
        newUser = await user.save()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    const token = generateToken(newUser)

    res.status(200).json({message: 'User registered', token, user: newUser })
})

router.put('/likeSong', checkUserAuth, async (req, res) => {
    try {
        const user = await User.findById(res.user.id)

        user.likedSongs.push(req.body.id)
        await user.save()

        const song = await Song.findById(req.body.id)
        song.numberOfLikes++

        await song.save()

        res.status(200).json({ message: 'Added successfully!', likedSongs: user.likedSongs })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/', checkUserAuth, async (req, res) => {
    try {
        const { user } = res
        const { name, DOB, photo } = req.body

        const updatedUser = await User.findByIdAndUpdate(user.id, { name, DOB, photo }, { new: true })

        res.status(200).json({ message: 'User updated', user: updatedUser })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/isListeningSong', checkUserAuth, async (req, res) => {
    try {
        const song = await Song.findById(req.body.id)
        const artist = await Artist.find({ name: song.createdBy })

        song.numberOfListeners++
        artist.numberOfListeners++

        await song.save()
        await artist.save()

        res.status(200).json({ message: 'Listener has been added' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/likedSongs', checkUserAuth, async (req, res) => {
    try {
        const { likedSongs: songIds } = await User.findById(res.user.id)

        const songs = []

        for (let songId of songIds) {
            const song = await Song.findById(songId)
            songs.push(song)
        }

        res.status(200).json({ message: 'Fetched all liked songs', songs })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/playlists', checkUserAuth, async (req, res) => {
    try {
        const playlists = await Playlist.find({ createdBy: res.user.email })

        res.status(200).json({ message: 'Fetched all user playlists', playlists })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router