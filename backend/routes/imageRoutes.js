const express = require('express');
const multer = require('multer');
const {
    uploadImage,
    getImageById
} = require('../controllers/imageController');

const router = express.Router();

// Configure multer for handling file uploads
const upload = multer({
    storage: multer.memoryStorage(),       // Store uploaded files in memory (RAM)
    limits: { fileSize: 5 * 1024 * 1024 }, // Set a file size limit of 5MB
});

// POST route to upload the image
// The 'upload.single('image')' middleware processes the file before passing control to uploadImage
// 'image' refers to the field name in the form where the file is uploaded
router.post('/', upload.single('image'), uploadImage);

// GET route to retrieve an image by its ID
router.get('/id/:id', getImageById);

module.exports = router;
