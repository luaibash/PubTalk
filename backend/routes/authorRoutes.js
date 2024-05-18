const express = require('express');
const {
    getAuthorByName,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/authorController');

const router = express.Router();

// GET an author by specifying name
router.get('/:name', getAuthorByName);

// POST a new author
router.post('/', createAuthor);

// UPDATE an author
router.put('/:id', updateAuthor);

// DELETE an author
router.delete('/:id', deleteAuthor);

module.exports = router;