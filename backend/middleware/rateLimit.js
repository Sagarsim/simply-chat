const setRateLimit = require("express-rate-limit");

const rateLimiter = setRateLimit({
  windowMs: 60 * 1000, // 1 min in milliseconds
  max: 100,
  message: "You have exceeded the 10 requests in 1min limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
