const jwt = require('jsonwebtoken');

// Short-lived — sent to frontend, kept in memory, used in Authorization header
const generateAccessToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

// Long-lived — stored in an httpOnly cookie, never touched by frontend JS
const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = { generateAccessToken, generateRefreshToken };