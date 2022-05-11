import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from 'dotenv'

import mainRoute from './routes/main.js'
import userRoute from './routes/users.js'
import songRoute from './routes/song.js'
import playlistRoute from './routes/playlist.js'
import artistRoute from './routes/artist.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', mainRoute)
app.use('/users', userRoute)
app.use('/songs', songRoute)
app.use('/playlists', playlistRoute)
app.use('/artists', artistRoute)

const port = process.env.PORT || 4000

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('mongo connected'))
    .then(() => app.listen(port, () => console.log(`Server started at http://localhost:${port}`)))
    .catch(err => console.log(err))

