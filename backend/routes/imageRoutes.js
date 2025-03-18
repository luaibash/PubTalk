const express = require('express');
const multer = require('multer');
const {uploadImage, getImageById} = require('../controllers/imageController');

const router = express.Router();

// Set up multer storage
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// POST route to upload the image
router.post('/', upload.single('image'), uploadImage);

// GET route to retrieve an image by its ID
router.get('/id/:id', getImageById);

module.exports = router;
