import mongoose from 'mongoose'

const { Schema, model } = mongoose

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    DOB: Schema.Types.Date,
    playlists: [Schema.Types.ObjectId],
    likedSongs: [Schema.Types.ObjectId]
})

export default model('Users', userSchema)