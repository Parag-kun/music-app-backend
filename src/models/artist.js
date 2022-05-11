import mongoose from 'mongoose'

const { Schema, model } = mongoose

const artistSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    numOfListeners: {
        type: Number,
        default: 0
    },
    photo: String
})

export default model('Artists', artistSchema)