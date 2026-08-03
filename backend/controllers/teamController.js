const TeamMember = require('../models/TeamMember');

// @route  GET /api/team
// @access Public
const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ isLeadership: -1, department: 1, order: 1, createdAt: 1 });
    res.json({ members });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  POST /api/team
// @access Private (admin, editor)
const createTeamMember = async (req, res) => {
  try {
    const { name, role, department, initials, imageSrc, isLeadership, order } = req.body;

    if (!name || !role || !department || !initials) {
      return res.status(400).json({ message: 'Name, role, department, and initials are required' });
    }

    const member = await TeamMember.create({ name, role, department, initials, imageSrc, isLeadership, order });
    res.status(201).json({ message: 'Team member created successfully', member });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PUT /api/team/:id
// @access Private (admin, editor)
const updateTeamMember = async (req, res) => {
  try {
    const { name, role, department, initials, imageSrc, isLeadership, order } = req.body;

    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    if (name !== undefined) member.name = name;
    if (role !== undefined) member.role = role;
    if (department !== undefined) member.department = department;
    if (initials !== undefined) member.initials = initials;
    if (imageSrc !== undefined) member.imageSrc = imageSrc;
    if (isLeadership !== undefined) member.isLeadership = isLeadership;
    if (order !== undefined) member.order = order;

    await member.save();

    res.json({ message: 'Team member updated successfully', member });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  DELETE /api/team/:id
// @access Private (admin only)
const deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    await member.deleteOne();

    res.json({ message: 'Team member deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAllTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember };