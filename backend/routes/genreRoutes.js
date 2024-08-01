const express = require('express')
const {   
    getGenreByName,
    getRandomGenres,
    createGenre,
    updateGenre,
    deleteGenre
} = require('../controllers/genreController')

const router = express.Router()

// GET genre by name
router.get('/name/:name', getGenreByName)

// GET RANDOM genres
router.get('/random', getRandomGenres)

// POST create a new genre
router.post('/', createGenre);

// PUT update a genre by name
router.put('/name/:name', updateGenre);

// DELETE a genre by name
router.delete('/name/:name', deleteGenre);

module.exports = router