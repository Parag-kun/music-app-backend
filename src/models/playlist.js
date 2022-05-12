import mongoose from 'mongoose'

const { Schema, model } = mongoose

const playlistSchema = new Schema({
    createdBy: String,
    title: {
        type: String,
        default: 'No title'
    },
    genre: String,
    songs: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    photo: String
})

export default model('Playlists', playlistSchema)