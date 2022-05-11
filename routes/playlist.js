import { Router } from "express"

import Playlist from '../models/playlist.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find({})

        res.status(200).json({ playlists })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)
        
        res.status(200).json({ playlist })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router