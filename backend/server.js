require('dotenv').config() // Allows us to use the .env folder which is a private folder that can keep sensitive info such as port number

const express = require('express')
const mongoose = require('mongoose')
const articleRoutes = require('./routes/articles') // Gets the articles.js routes
// This is so that we dont need to do app.get() in this server.js file

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


//connect to DB
mongoose.connect(process.env.MONGO_URI) // Connects to the database
    .then(() => {     
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to DB and listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


//to make the whole node package i need to install node on my computer, then in terminal in backend folder i needed to type in terminal
//npm init -y to install and confirm everything
//then i used npm intall (name here) to install whatever package i wanted to help with me
//i installed a lot of things, to look at what i installed, go to package.json

//i also installed nodemon locally so to run it i need to type npx nodemon (filename.js)

//TO RUN IT WITH FRONTEND, i need to type npm run dev in 1 terminal for backend
//then i need to type npm start in another terminal for frontend
