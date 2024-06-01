// contactController.js
const express = require('express');
const router = express.Router();
const rateLimiter = require('./rateLimitController');

router.post('/', rateLimiter, (req, res) => {
    // Handle the contact form submission logic here
    const { name, email, message } = req.body;
    
    console.log("ran")
    // Example response
    res.status(200).json({ message: 'Form submitted successfully!' });
});

module.exports = router;