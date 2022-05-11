import mongoose from 'mongoose'

const { Schema, model } = mongoose

const songSchema = new Schema({
    title: String,
    publishedDate: {
        type: Schema.Types.Date,
        default: () => Date.now()
    },
    genre: String,
    artistName: String,
    link: String,
    photo: String,
    numberOfListeners: Number
})

export default model('Songs', songSchema)