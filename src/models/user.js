import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    DOB: Schema.Types.Date,
    playlists: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    likedSongs: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    photo: String
})

export default model('Users', userSchema)