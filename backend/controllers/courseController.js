const Course = require('../models/Course');

// @route  GET /api/courses
// @access Public — only returns published courses, used by the marketing Courses.jsx page
const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ published: true }).sort({ order: 1, createdAt: 1 });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  GET /api/courses/admin
// @access Private (admin, editor) — returns every course, published or not, for the admin table
const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find().sort({ order: 1, createdAt: 1 });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  POST /api/courses
// @access Private (admin, editor)
const createCourse = async (req, res) => {
  try {
    const { title, level, duration, description, icon, order, published } = req.body;

    if (!title || !level || !duration || !description) {
      return res.status(400).json({ message: 'Title, level, duration, and description are required' });
    }

    const course = await Course.create({ title, level, duration, description, icon, order, published });
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PUT /api/courses/:id
// @access Private (admin, editor)
const updateCourse = async (req, res) => {
  try {
    const { title, level, duration, description, icon, order, published } = req.body;

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (title !== undefined) course.title = title;
    if (level !== undefined) course.level = level;
    if (duration !== undefined) course.duration = duration;
    if (description !== undefined) course.description = description;
    if (icon !== undefined) course.icon = icon;
    if (order !== undefined) course.order = order;
    if (published !== undefined) course.published = published;

    await course.save();

    res.json({ message: 'Course updated successfully', course });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  DELETE /api/courses/:id
// @access Private (admin only)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await course.deleteOne();

    res.json({ message: 'Course deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getPublishedCourses,
  getAllCoursesAdmin,
  createCourse,
  updateCourse,
  deleteCourse,
};