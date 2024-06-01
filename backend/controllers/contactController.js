const rateLimit = require('express-rate-limit');

// Limits up to 5 requests per 10 minutes for the contact form
const rateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,   // Limit of 10 minutes
    max: 5,                     // Limit of 5 requests
    message: { message: 'Too many requests, try again later.' },
});

// If the limit has not been reached, return a message to notify that the form can be sent
const handleRateLimiter = (req, res) => {
    res.status(200).json({ message: 'Form can be sent, under limit!' });
};

module.exports = {
    rateLimiter,
    handleRateLimiter,
};