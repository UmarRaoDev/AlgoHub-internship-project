const mongoose = require('mongoose');

const faqItemSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, 'Question is required'], trim: true },
    answer: { type: String, required: [true, 'Answer is required'], trim: true },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      // e.g. "General", "Working With Us", "Internships & Courses" — free
      // text, so admins can add a new category without a code change.
    },
    order: { type: Number, default: 0 }, // ordering within a category
  },
  { timestamps: true }
);

module.exports = mongoose.model('FaqItem', faqItemSchema);