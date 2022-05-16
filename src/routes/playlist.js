import { Router } from "express"

import Playlist from '../models/playlist.js'
import User from "../models/user.js"
import { checkUserAuth } from "../utils/auth.js"

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

router.post('/create', checkUserAuth, async (req, res) => {
    try {
        const playlist = new Playlist({ ...req.body, createdBy: res.user.email })

        const user = await User.findById(res.user.id)
        const newPlaylist = await playlist.save()

        user.playlists.push(newPlaylist._id)

        await user.save()

        res.status(200).json({ message: 'Created successfully', playlist: newPlaylist })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.put('/:id/add', checkUserAuth, async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)

        playlist.songs.push(req.body.id)
        await playlist.save()

        res.status(200).json({ message: 'Added successfully', playlist })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.delete('/:id/remove', checkUserAuth, async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id)

        playlist.songs = playlist.songs.filter(songId => songId !== req.body.id)
        await playlist.save()

        res.status(200).json({ message: 'Removed successfully', playlist})
    } catch (err) {
        
    }
})

router.delete('/:id', checkUserAuth, async (req, res) => {
    try {
        const { id } = req.params
        const { user } = res

        await Playlist.findByIdAndDelete(user.id)

        res.status(200).json({ message: 'Deleted playlist' + id })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router