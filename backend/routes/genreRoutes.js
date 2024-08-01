const express = require('express')
const {   
    getGenreByName,
    getRandomGenres,
} = require('../controllers/genreController')

const router = express.Router()

// GET genre by name
router.get('/name/:name', getGenreByName)

// GET RANDOM genres
router.get('/random', getRandomGenres)

module.exports = router