const mongoose = require('mongoose');

// Keep in sync with frontend/src/utils/courseIcons.jsx
const ICON_KEYS = ['code', 'spark', 'layers', 'cloud', 'phone', 'pen'];

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    level: { type: String, required: [true, 'Level is required'], trim: true }, // e.g. "Beginner"
    duration: { type: String, required: [true, 'Duration is required'], trim: true }, // e.g. "8 Weeks"
    description: { type: String, required: [true, 'Description is required'], trim: true },
    icon: { type: String, enum: ICON_KEYS, default: 'code' },
    order: { type: Number, default: 0 }, // lower numbers show first
    published: { type: Boolean, default: true }, // unpublished courses are hidden from the public page
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
module.exports.ICON_KEYS = ICON_KEYS;