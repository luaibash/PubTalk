const mongoose = require('mongoose')

const Schema = mongoose.Schema

const articleSchema = new Schema({      //new schema document
    //here we will put all the properties in a workout schema
    //if this was an article schema it would have title, author, date created, date updated, body, html property
    title: {    //this is our title property
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    paragrah: {
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

}, {timestamps: true})  //this is a 2nd argument that i have set so that it will automatically give us a timestamp of when it is created and last updated, so for article this will be that property

module.exports = mongoose.model('Article', articleSchema)    //creates this model

//so now i can say Article as a type for example Article.find() it finds all the workouts for us


//1. figure out how to deploy it (get a domain name website)
//2. figure out why we need 2 servers (if there is no need then combine it to 1)
//3. find best practice for how a website and database run together
//4. start working on backend
//5. install middleware