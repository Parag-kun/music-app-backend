import mongoose from 'mongoose'

const { Schema, model } = mongoose

const playlistSchema = new Schema({
    createdBy: String,
    genre: String,
    songs: [Schema.Types.ObjectId],
    photo: String
})

export default model('Playlists', playlistSchema)