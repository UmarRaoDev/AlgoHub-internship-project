const FaqItem = require('../models/FaqItem');

// @route  GET /api/faqs
// @access Public
const getAllFaqs = async (req, res) => {
  try {
    const faqs = await FaqItem.find().sort({ category: 1, order: 1, createdAt: 1 });
    res.json({ faqs });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  POST /api/faqs
// @access Private (admin, editor)
const createFaq = async (req, res) => {
  try {
    const { question, answer, category, order } = req.body;

    if (!question || !answer || !category) {
      return res.status(400).json({ message: 'Question, answer, and category are required' });
    }

    const faq = await FaqItem.create({ question, answer, category, order });
    res.status(201).json({ message: 'FAQ created successfully', faq });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PUT /api/faqs/:id
// @access Private (admin, editor)
const updateFaq = async (req, res) => {
  try {
    const { question, answer, category, order } = req.body;

    const faq = await FaqItem.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    if (question !== undefined) faq.question = question;
    if (answer !== undefined) faq.answer = answer;
    if (category !== undefined) faq.category = category;
    if (order !== undefined) faq.order = order;

    await faq.save();

    res.json({ message: 'FAQ updated successfully', faq });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  DELETE /api/faqs/:id
// @access Private (admin only)
const deleteFaq = async (req, res) => {
  try {
    const faq = await FaqItem.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    await faq.deleteOne();

    res.json({ message: 'FAQ deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getAllFaqs, createFaq, updateFaq, deleteFaq };