import bcryptjs from "bcryptjs"

import User from "../models/user.js"
import Artist from '../models/artist.js'

export const validateUserLogin = async ({ body: { email, password } }, res, next) => {
    try {
        const user = await User.findOne({ email })
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

export const validateUserRegister = async ({ body: { email } }, res, next) => {
    try {
        const user = await User.exists({ email })

        if (user) res.status(400).json({ message: 'User already exists!' })
        else next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const validateArtistLogin = async ({ body: { email, password }}, res, next) => {
    try {
        const artist = await Artist.findOne({ email })
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

export const validateArtistRegister = async ({ body: { email } }, res, next) => {
    try {
        const artist = await Artist.exists({ email })

        if (artist) res.status(400).json({ message: 'Artist already exists!' })
        else next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}