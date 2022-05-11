import jwt from "jsonwebtoken"

export const checkUserAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')?.[1] ?? ''
        const user = jwt.verify(token, process.env.SECRET_KEY)

        if (!user) res.status(400).json({ message: 'User is not authenticated' })
        else {
            res.user = user
            next()
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const checkArtistAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')?.[1] ?? ''
        const artist = jwt.verify(token, process.env.SECRET_KEY)

        if (!artist) res.status(400).json({ message: 'Artist is not authenticated' })
        else {
            res.artist = artist
            next()
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}