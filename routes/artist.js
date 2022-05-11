import { Router } from "express"

import Artist from "../models/artist.js"
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

router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id)

        res.status(200).json({ message: err.message })
    } catch (err) {
        res.send(500).json({ message: err.message })
    }
})

router.post('/login',validateArtistLogin, (req, res) => {
    res.status(200).json({ token: generateToken(res.artist) })
})

router.post('/register', validateArtistRegister, async (req, res) => {
    try {
        req.body.password = await bcryptjs.hash(req.body.password, 10)

        const artist = new User(req.body)
        const newArtist = await user.save()

        res.status(200).json({ token: generateToken(newArtist) })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router