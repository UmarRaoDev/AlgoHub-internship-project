const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    role: { type: String, required: [true, 'Role is required'], trim: true },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true,
      // e.g. "Engineering", "Design", "AI & Data", "Operations" — free text
      // so admins can add new departments without a code change.
    },
    initials: { type: String, required: [true, 'Initials are required'], trim: true },
    imageSrc: { type: String, default: '' }, // optional; falls back to initials avatar if empty
    isLeadership: { type: Boolean, default: false }, // shown in the separate "Leadership" section
    order: { type: Number, default: 0 }, // ordering within a department (or within leadership)
  },
  { timestamps: true }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);