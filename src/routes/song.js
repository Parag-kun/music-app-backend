import { Router } from "express"

import Song from '../models/song.js'
import { checkArtistAuth } from "../utils/auth.js"

const router = Router()

router.get('/', async (req, res) => {
    try {
        const { sort } = req.query
        const songs = await Song.find({})

        res.status(200).json({ message: 'Sorted by ' + sort, songs: songs.sort((a, b) => b[sort] - a[sort]) })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/search', async (req, res) => {
    try {
        const songs = await Song.find({})
        const filteredSongs = songs.filter(({ title }) => title.toLowerCase().includes(req.query.songName.toLowerCase()))

        res.status(200).json({ message: 'Search results', songs: filteredSongs })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/artist/:id', async (req, res) => {
    try {
        const songs = await Song.find({ artistId: req.params.id })

        res.status(200).json({ message: 'Fetched all songs of artist' + songs[0].artistName, songs })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const song = await Song.findOne({ _id: req.params.id })

        res.status(200).json({ song })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/create', checkArtistAuth, async (req, res) => {
    try {
        const song = new Song({ ...req.body, artistName: res.artist.name, artistId: res.artist.id })
        const newSong = await song.save()

        res.status(200).json({ message: 'Song created', song: newSong })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router