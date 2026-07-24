const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Any logged-in user can access this
router.get('/profile', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, this is your profile.` });
});

// Only admins can access this
router.get('/admin-only', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome, admin.' });
});

// Admins and editors can access this
router.get('/editor-or-admin', protect, authorize('admin', 'editor'), (req, res) => {
  res.json({ message: 'Welcome, editor or admin.' });
});

module.exports = router;