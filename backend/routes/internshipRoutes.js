const express = require('express');
const { getInternship, updateInternship } = require('../controllers/internshipController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public — the marketing Internship page fetches this with no auth
router.get('/', getInternship);

// Editors can edit content; no delete endpoint since this is a singleton page
router.put('/', protect, authorize('admin', 'editor'), updateInternship);

module.exports = router;