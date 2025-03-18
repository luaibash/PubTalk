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
        type: [String],
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    images: [{
        type: String, // store the image URL or filename
        required: false, // Images are optional
      }],
}, {timestamps: true})  // Extra argument that will automatically give timestamp of when it is created and last updated

// Creates this model to be used in the controller as the name "Article". Ex. Article.find() will find all articles
module.exports = mongoose.model('Article', articleSchema)