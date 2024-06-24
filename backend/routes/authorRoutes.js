const express = require('express');
const {
    getAuthorByName,
    getRandomAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor,
} = require('../controllers/authorController');

const router = express.Router();

// GET an author by specifying name
router.get('/name/:name', getAuthorByName);

// GET RANDOM authors
router.get('/random', getRandomAuthors);

// POST a new author
router.post('/', createAuthor);

// UPDATE an author
router.put('/:id', updateAuthor);

// DELETE an author
router.delete('/:id', deleteAuthor);

module.exports = router;