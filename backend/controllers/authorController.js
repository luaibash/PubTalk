const Author = require('../models/authorModel');
const mongoose = require('mongoose');

// Get an author specified by name
const getAuthorByName = async (req, res) => {
    // Retrieves name from GET request
    const { name } = req.params;

    // Checks for author with name. If no author, returns an error.
    try {
        const author = await Author.findOne({ name });
        if (!author) return res.status(404).json({ error: 'Author not found' });
        res.status(200).json(author);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new author
const createAuthor = async (req, res) => {
    const { name, description, linkedIn } = req.body;

    // Name and description must be provided to create a new author
    if (!name || !description) return res.status(400).json({ error: 'name and description are required' });

    try {
        const author = await Author.create({ name, description, linkedIn });
        res.status(201).json(author);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an author
const updateAuthor = async (req, res) => {
    // Searches for the author to update from id, grabs the id from the request
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'no such author' });

    try {
        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAuthor) return res.status(404).json({ error: 'no such author' });
        res.status(200).json(updatedAuthor);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete an author
const deleteAuthor = async (req, res) => {
    // Searches for the author to update from id, grabs the id from the request
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'no such author' });

    try {
        const deletedAuthor = await Author.findByIdAndDelete(id);
        if (!deletedAuthor) return res.status(404).json({ error: 'no such author' });
        res.status(200).json(deletedAuthor);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAuthorByName,
    createAuthor,
    updateAuthor,
    deleteAuthor
};