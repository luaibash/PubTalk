require('dotenv').config() //allows us to use the .env folder which is a private folder 
//where i can put private sensitive information and it wont be pushed into my github it i decided to put this all on there
//it .env just adds to more private variables for instance of this one would be the port number

const express = require('express')
const mongoose = require('mongoose')
const articleRoutes = require('./routes/articles') //this gets the workouts.js routes
//this is so that we dont need to do app.get() in this server.js file

//express app
const app = express()

//middleware
app.use(express.json()) //any request it looks in it checks to find some body (attributes) and attaches it to req object
app.use((req, res, next) => {
    console.log(req.path, req.method) //just prints request paths and methods to the server
    next()
})

//routes
app.use('/api/articles', articleRoutes)     //goes to app.get in articleRoutes

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})

//connect to DB
// mongoose.connect(process.env.MONGO_URI) //connects to the database
//     .then(() => {       //what should we do after connecting to it? we want to start listen to request!
//         //listen for requests
//         app.listen(process.env.PORT, () => {
//             console.log("connected to DB and listening on port", process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })





//to make the whole node package i need to install node on my computer, then in terminal in backend folder i needed to type in terminal
//npm init -y to install and confirm everything
//then i used npm intall (name here) to install whatever package i wanted to help with me
//i installed a lot of things, to look at what i installed, go to package.json
//i also installed nodemon locally so to run it i need to type npx nodemon (filename.js)
//TO RUN IT WITH FRONTEND, i need to type npm run dev in 1 terminal for backend
//then i need to type npm start in another terminal for frontend
