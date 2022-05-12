import { Router } from "express"

import Artist from "../models/artist.js"
import Song from "../models/song.js"
import user from "../models/user.js"

import { checkArtistAuth } from "../utils/auth.js"
import { validateArtistLogin, validateArtistRegister } from "../utils/validation.js"

const router = Router()

const generateToken = artist => jwt.sign(JSON.stringify(artist), process.env.SECRET_KEY)

router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find({})

        res.status(200).json({ artists })
    } catch (err) {
        res.send(500).json({ message: err.message })
    }
})

router.get('/search', async (req, res) => {
    try {
        const artists = await Artist.find({})
        const filteredArtists = artists.filter(({ name }) => name.includes(req.query.artistName))

        res.status(200).json({ message: 'Search results', artists: filteredArtists })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id)

        res.status(200).json({ message: 'Artist fetched', artist })
    } catch (err) {
        res.send(500).json({ message: err.message })
    }
})

router.post('/login', validateArtistLogin, (req, res) => {
    res.status(200).json({ token: generateToken(res.artist) })
})

router.post('/createSong', checkArtistAuth, async (req, res) => {
    try {
        const song = new Song({ ...req.body, artistName: res.artist.name, artistId: res.artist._id })
        const newSong = await song.save()

        res.status(200).json({ message: 'Song created', song: newSong })
    } catch (err) {
        res.send(500).json({ message: err.message })
    }
})

router.post('/register', validateArtistRegister, async (req, res) => {
    try {
        req.body.password = await bcryptjs.hash(req.body.password, 10)

        const artist = new User({ ...user.body, numberOfListeners: 0 })
        const newArtist = await artist.save()

        res.status(200).json({ token: generateToken(newArtist) })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/', checkArtistAuth, async (req, res) => {
    try {
        const { artist } = res
        const { name, age, photo } = req.body
        
        artist.name = name
        artist.age = age
        artist.photo = photo

        await artist.save()

        res.status(200).json({ message: 'Artist updated', artist })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router