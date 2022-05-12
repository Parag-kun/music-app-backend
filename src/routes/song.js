import { Router } from "express"

import Song from '../models/song.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const songs = await Song.find({})

        res.status(200).json({ songs })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/search', async (req, res) => {
    try {
        const songs = await Song.find({})
        const filteredSongs = songs.filter(({ title }) => title.includes(req.query.songName))

        res.status(200).json({ message: 'Search results', songs: filteredSongs })
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

router.delete('/:id', async (req, res) => {
    try {
        await Song.findByIdAndDelete(req.params.id)

        res.status.json({ message: 'Deleted song with id: ' + req.params.id })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router