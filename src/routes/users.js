import { Router } from 'express'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import User from '../models/user.js'
import Playlist from '../models/playlist.js'
import { validateUserRegister, validateUserLogin } from '../utils/validation.js'
import { checkUserAuth } from '../utils/auth.js'

const router = Router()

const generateToken = user => jwt.sign(JSON.stringify(user), process.env.SECRET_KEY)

router.post('/login', validateUserLogin, (req, res) => {
    res.status(200).json({ token: generateToken(res.user) })
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

    res.status(200).json({ token })
})

router.put('/addToLiked', checkUserAuth, async (req, res) => {
    try {
        const user = await User.findById(res.user._id)

        user.likedSongs.push(req.body.id)
        await user.save()
        
        res.status(200).json({ message: 'Added successfully!', likedSongs: user.likedSongs })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/createPlaylist', checkUserAuth, async (req, res) => {
    try {
        const playlist = new Playlist({ ...req.body, createdBy: res.user.name })

        const user = await User.findById(res.user._id)
        const newPlaylist = await playlist.save()

        user.playlists.push(newPlaylist._id)

        await user.save()

        res.status(200).json({ message: 'Created successfully', playlist: newPlaylist })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/addToPlaylist/:id', checkUserAuth, async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)

        playlist.songs.push(req.body.id)
        await playlist.save()

        res.status(200).json({ message: 'Added successfully', playlist })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router