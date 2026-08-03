const express = require('express');
const {
  getPublishedCourses,
  getAllCoursesAdmin,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public — only published courses, used by the marketing Courses page
router.get('/', getPublishedCourses);

// Admin table needs to see unpublished (draft) courses too
router.get('/admin', protect, authorize('admin', 'editor'), getAllCoursesAdmin);

// Editors can create/edit/publish content, only admins can delete it
router.post('/', protect, authorize('admin', 'editor'), createCourse);
router.put('/:id', protect, authorize('admin', 'editor'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

module.exports = router;