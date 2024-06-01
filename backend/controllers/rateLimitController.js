const rateLimit = require('express-rate-limit');

// Limits each user to a total of 5 requests every 10 minutes
const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many submissions from this IP, please try again later.',
});

module.exports = rateLimiter;