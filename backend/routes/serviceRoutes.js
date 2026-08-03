const express = require('express');
const {
  getAllServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public — the marketing Services page fetches this with no auth
router.get('/', getAllServices);

// Editors can create/edit content, only admins can delete it
router.post('/', protect, authorize('admin', 'editor'), createService);
router.put('/:id', protect, authorize('admin', 'editor'), updateService);
router.delete('/:id', protect, authorize('admin'), deleteService);

module.exports = router;