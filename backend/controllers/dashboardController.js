const User = require('../models/User');
const Service = require('../models/Service');
const Course = require('../models/Course');
const TeamMember = require('../models/TeamMember');

// @route  GET /api/dashboard/stats
// @access Private (admin, editor)
//
// Add a stat here whenever a new module gets built — this is the ONLY
// backend change needed; the admin dashboard just renders whatever comes
// back from this endpoint (see frontend/src/pages/admin/AdminDashboard.jsx).
const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalServices, totalCourses, publishedCourses, totalTeamMembers] = await Promise.all([
      User.countDocuments(),
      Service.countDocuments(),
      Course.countDocuments(),
      Course.countDocuments({ published: true }),
      TeamMember.countDocuments(),
    ]);

    res.json({
      stats: {
        users: totalUsers,
        services: totalServices,
        courses: totalCourses,
        coursesPublished: publishedCourses,
        coursesDraft: totalCourses - publishedCourses,
        team: totalTeamMembers,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getDashboardStats };