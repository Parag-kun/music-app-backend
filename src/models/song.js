import mongoose from 'mongoose'

const { Schema, model } = mongoose

const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Schema.Types.Date,
        default: () => Date.now()
    },
    genre: String,
    artistName: String,
    artistId: Schema.Types.ObjectId,
    link: {
        type: String, 
        required: true
    },
    photo: String,
    numberOfListeners: {
        type: Number,
        default: 0
    },
    numberOfLikes: {
        type: Number,
        default: 0
    }
})

export default model('Songs', songSchema)