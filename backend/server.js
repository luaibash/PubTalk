require('dotenv').config();                                         // Allows use of the .env folder which holds private data
const express = require('express');
const mongoose = require('mongoose');
const syncAlgoliaPubtalkIndex = require('./algolia/syncAlgolia');
const setUpChangeStreams = require('./algolia/setUpChangeStreams');
const articleRoutes = require('./routes/articleRoutes');            // Gets the routes of each GET/POST/DELETE function from articleRoutes.js
const authorRoutes = require('./routes/authorRoutes');              // Gets the routes of each GET/POST/DELETE function from authorRoutes.js
const contactRoutes = require('./routes/contactRoutes');            // Gets the routes of each GET/POST/DELETE function from contactRoutes.js

// Express app
const app = express();

app.set('trust proxy', 1);

// Middleware
app.use(express.json()); // Any request it looks in it checks to find some body (attributes) and attaches it to req object
app.use((req, res, next) => {
    console.log(req.path, req.method); // Prints request paths and methods to the server
    next();
})

//routes
app.use('/api/contact', contactRoutes);  // Routes for contact controller functions
app.use('/api/articles', articleRoutes); // Routes for articles controller functions
app.use('/api/authors', authorRoutes);   // Routes for authors controller functions

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {     
        // Update Algolia database to be in sync with MongoDB database on server startup
        await syncAlgoliaPubtalkIndex();

        // Set up Change Streams, a listener that triggers on any change to the DB to resync the algolia DB
        setUpChangeStreams(mongoose.connection);

        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to DB and listening on port", process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })

// PREREQUISITES TO RUNNING BACKEND: First do "npm install" to install all needed libraries. Second add .env file with URI and port for server to run on
// TO RUN THE BACKEND: Types "npx nodemon server.js"
