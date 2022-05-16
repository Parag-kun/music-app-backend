import { Router } from "express"
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

import Artist from "../models/artist.js"
import Song from "../models/song.js"

import { checkArtistAuth } from "../utils/auth.js"
import { validateArtistLogin, validateArtistRegister } from "../utils/validation.js"

const router = Router()

const generateToken = artist => jwt.sign({ id: artist._id, name: artist.name }, process.env.SECRET_KEY)

router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find({})

        res.status(200).json({ artists })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/search', async (req, res) => {
    try {
        const artists = await Artist.find({})
        const filteredArtists = artists.filter(({ name }) => name.toLowerCase().includes(req.query.artistName.toLowerCase()))

        res.status(200).json({ message: 'Search results', artists: filteredArtists })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/songs', checkArtistAuth, async (req, res) => {
    try {
        const songs = await Song.find({ artistId: res.artist.id })

        res.status(200).json({ message: 'Fetched all songs of artist' + (songs[0]?.artistName ?? ''), songs })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id)

        res.status(200).json({ message: 'Artist fetched', artist })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/login', validateArtistLogin, (req, res) => {
    res.status(200).json({ message: 'Artist logged in', token: generateToken(res.artist), artist: res.artist })
})

router.post('/register', validateArtistRegister, async (req, res) => {
    try {
        req.body.password = await bcryptjs.hash(req.body.password, 10)

        const artist = new Artist({ ...req.body, numberOfListeners: 0 })
        const newArtist = await artist.save()

        res.status(200).json({ message: 'Artist registered', token: generateToken(newArtist), artist: newArtist })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/', checkArtistAuth, async (req, res) => {
    try {
        const { artist } = res
        const { name, age, photo } = req.body
        
        const updatedArtist = await Artist.findByIdAndUpdate(artist.id, { name, age, photo }, { new: true })

        res.status(200).json({ message: 'Artist updated', artist: updatedArtist })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router