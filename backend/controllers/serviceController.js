const Service = require('../models/Service.js');

// @route  GET /api/services
// @access Public (the public Services.jsx page fetches this directly, no auth)
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json({ services });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  POST /api/services
// @access Private (admin, editor)
const createService = async (req, res) => {
  try {
    const { title, description, href, icon, order } = req.body;

    if (!title || !description || !href) {
      return res.status(400).json({ message: 'Title, description, and link are required' });
    }

    const service = await Service.create({ title, description, href, icon, order });
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PUT /api/services/:id
// @access Private (admin, editor)
const updateService = async (req, res) => {
  try {
    const { title, description, href, icon, order } = req.body;

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (href !== undefined) service.href = href;
    if (icon !== undefined) service.icon = icon;
    if (order !== undefined) service.order = order;

    await service.save();

    res.json({ message: 'Service updated successfully', service });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  DELETE /api/services/:id
// @access Private (admin only)
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.deleteOne();

    res.json({ message: 'Service deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAllServices, createService, updateService, deleteService };