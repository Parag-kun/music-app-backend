import mongoose from 'mongoose'

const { Schema, model } = mongoose

const artistSchema = new Schema({
    name: String,
    password: String,
    age: Number,
    numOfListeners: Number,
    photo: String
})

export default model('Artists', artistSchema)