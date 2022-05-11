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

router.get('/:id', async (req, res) => {
    try {
        const song = await Song.findOne({ _id: req.params.id })

        res.status(200).json({ song })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router