const Genre = require('../models/genreModel')
const mongoose = require('mongoose')

// Get a genre by its name
const getGenreByName = async (req, res) => {
    // Retrieves genre name from GET request, and creates regex to have search be case insensitive
    const { name } = req.params;
    const caseInsensitiveName = new RegExp(`^${name}$`, 'i');

    // Checks for genre with name.
    const genre = await Genre.findOne({ genre: caseInsensitiveName });
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

// Create a new genre
const createGenre = async (req, res) => {
    const { genre, description } = req.body;

    // Genre and description must be provided to create a new genre
    if (!genre || !description) return res.status(400).json({ error: 'Genre and description are required' });

    try {
        const newGenre = await Genre.create({ genre, description });
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a genre
const updateGenre = async (req, res) => {
    const { name } = req.params;
    const { genre, description } = req.body;

    // Find the genre by name and update it
    try {
        const updatedGenre = await Genre.findOneAndUpdate(
            { genre: name },
            { genre, description },
            { new: true }
        );

        if (!updatedGenre) return res.status(404).json({ error: 'Genre not found' });
        res.status(200).json(updatedGenre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a genre
const deleteGenre = async (req, res) => {
    const { name } = req.params;

    // Find the genre by name and delete it
    try {
        const deletedGenre = await Genre.findOneAndDelete({ genre: name });
        if (!deletedGenre) return res.status(404).json({ error: 'Genre not found' });
        res.status(200).json(deletedGenre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getGenreByName,
    getRandomGenres,
    createGenre,
    updateGenre,
    deleteGenre
}