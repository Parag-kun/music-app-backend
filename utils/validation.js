import bcryptjs from "bcryptjs"

import User from "../models/user.js"
import Artist from '../models/artist.js'

export const validateUserLogin = async ({ body: { name, password } }, res, next) => {
    try {
        const user = await User.findOne({ name })
        const match = await bcryptjs.compare(password, user?.password ?? '')

        if (!user) res.status(400).json({ message: 'User does not exist!' })
        else if (!match) res.status(400).json({ message: 'Incorrect password' })
        else {
            res.user = user
            next()
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const validateUserRegister = async ({ body: { name } }, res, next) => {
    try {
        const user = await User.exists({ name })

        if (user) res.status(400).json({ message: 'User already exists!' })
        else next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const validateArtistLogin = async ({ body: { name, password }}, res, next) => {
    try {
        const artist = await Artist.findOne({ name })
        const match = await bcryptjs.compare(password, artist?.password ?? '')

        if (!artist) res.status(400).json({ message: 'Artist does not exist!' })
        else if (!match) res.status(400).json({ message: 'Incorrect password' })
        else {
            res.artist = artist
            next()
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const validateArtistRegister = async ({ body: { name } }, res, next) => {
    try {
        const artist = await Artist.exists({ name })

        if (artist) res.status(400).json({ message: 'Artist already exists!' })
        else next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}