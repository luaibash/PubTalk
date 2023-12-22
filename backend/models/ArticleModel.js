const mongoose = require('mongoose')

const Schema = mongoose.Schema

const articleSchema = new Schema({
    //Article schema containing title, author, date created, date updated, body, html property
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
    

}, {timestamps: true})  //this is a 2nd argument that will automatically give us a timestamp of when it is created and last updated, so for article this will be that property

module.exports = mongoose.model('Article', articleSchema)    //creates this model

// Article can now be used, for example Article.find() will finds all the articles for us