const express = require('express');
const { rateLimiter, handleRateLimiter } = require('../controllers/contactController');

const router = express.Router();

// Apply rate limiter and handle contact form submission
router.post('/', rateLimiter, handleRateLimiter);

module.exports = router;