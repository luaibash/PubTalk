const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Author schema containing name, description, and linkedIn (not required as some people will not have one)
const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    linkedIn: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true
    }
});

// Creates this model to be used in the controller as the name "Author"
module.exports = mongoose.model('Author', authorSchema);