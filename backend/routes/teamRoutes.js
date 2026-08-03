const express = require('express');
const {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require('../controllers/teamController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public — the marketing Team page fetches this with no auth
router.get('/', getAllTeamMembers);

// Editors can create/edit content, only admins can delete it
router.post('/', protect, authorize('admin', 'editor'), createTeamMember);
router.put('/:id', protect, authorize('admin', 'editor'), updateTeamMember);
router.delete('/:id', protect, authorize('admin'), deleteTeamMember);

module.exports = router;