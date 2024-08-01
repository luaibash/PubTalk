const Genre = require('../models/genreModel')
const mongoose = require('mongoose')

// Get a genre by its name
const getGenreByName = async (req, res) => {
    // Retrieves genre name from GET request
    const { genreName } = req.params;

    // Checks for genre with name.
    const genre = await Genre.findOne({ name: genreName });
    if (!genre) return res.status(404).json({ message: 'Genre not found' });
    res.status(200).json(genre);
}

// Get a random number of genres, with limit that specifies how many genres to grab
const getRandomGenres = async (req, res) => {
    // Retrieves limit parameter from query string, if not specified, default to 1 article
    const limit = parseInt(req.query.limit) || 1;

    // Use the aggregate function to get the specified number of random articles
    const genres = await Genre.aggregate([{ $sample: { size: limit } }]);
    res.status(200).json(genres);
}

module.exports = {
    getGenreByName,
    getRandomGenres
}