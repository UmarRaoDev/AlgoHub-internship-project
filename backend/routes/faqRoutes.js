const express = require('express');
const { getAllFaqs, createFaq, updateFaq, deleteFaq } = require('../controllers/faqController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public — the marketing FAQ page fetches this with no auth
router.get('/', getAllFaqs);

// Editors can create/edit content, only admins can delete it
router.post('/', protect, authorize('admin', 'editor'), createFaq);
router.put('/:id', protect, authorize('admin', 'editor'), updateFaq);
router.delete('/:id', protect, authorize('admin'), deleteFaq);

module.exports = router;