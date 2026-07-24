const User = require('../models/User');

// @route  GET /api/users
// @access Private (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-refreshToken');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PATCH /api/users/:id/role
// @access Private (admin only)
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const validRoles = ['admin', 'editor', 'user'];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: `Role must be one of: ${validRoles.join(', ')}` });
    }

    // Prevent an admin from accidentally changing their own role and locking themselves out
    if (req.params.id === String(req.user._id)) {
      return res.status(400).json({ message: "You can't change your own role" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({
      message: 'Role updated successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  DELETE /api/users/:id
// @access Private (admin only)
const deleteUser = async (req, res) => {
  try {
    // Prevent an admin from accidentally deleting their own account
    if (req.params.id === String(req.user._id)) {
      return res.status(400).json({ message: "You can't delete your own account" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAllUsers, updateUserRole, deleteUser };