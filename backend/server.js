require('dotenv').config() // Allows us to use the .env folder which is a private folder that can keep sensitive info such as port number

const express = require('express')
const mongoose = require('mongoose')
const articleRoutes = require('./routes/articleRoutes') // Gets the routes of each GET/POST/DELETE function from articleRoutes.js
const authorRoutes = require('./routes/authorRoutes')   // Gets the routes of each GET/POST/DELETE function from authorRoutes.js

// Express app
const app = express()

// Middleware
app.use(express.json()) // Any request it looks in it checks to find some body (attributes) and attaches it to req object
app.use((req, res, next) => {
    console.log(req.path, req.method) // Prints request paths and methods to the server
    next()
})

//routes
app.use('/api/articles', articleRoutes)     // Goes to app.get in articleRoutes
// app.use('/api/authors', authorRoutes)      // Routes for authors

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {     
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to DB and listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// PREREQUISITES TO RUNNING BACKEND: First do "npm install" to install all needed libraries. Second add .env file with URI and port for server to run on
// TO RUN THE BACKEND: Types "npx nodemon server.js"
