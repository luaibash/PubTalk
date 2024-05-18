const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Article schema containing title, author, date created, date updated, body, html property
const articleSchema = new Schema({
    title: {   
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
    

}, {timestamps: true})  // Extra argument that will automatically give timestamp of when it is created and last updated

module.exports = mongoose.model('Article', articleSchema)   // Creates this model to be used in the controller as the name "Article". Ex. Article.find() will find all articles