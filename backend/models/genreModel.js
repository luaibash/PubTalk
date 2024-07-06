const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Genre schema that just includes the name of the genre
const genreSchema = new Schema({
    genre: {
        type: String,
        required: true
    }
});

// Creates this model to be used to access the genre table in mongoDB
module.exports = mongoose.model('Genre', genreSchema);