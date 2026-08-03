const mongoose = require('mongoose');

// Keep in sync with frontend/src/utils/internshipIcons.jsx
const ICON_KEYS = ['layers', 'server', 'pen', 'spark', 'shield', 'cloud'];

const trackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    icon: { type: String, enum: ICON_KEYS, default: 'layers' },
  },
  { _id: true }
);

const processStepSchema = new mongoose.Schema(
  {
    step: { type: String, required: true, trim: true }, // e.g. "01"
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: true }
);

const internshipSchema = new mongoose.Schema(
  {
    // Only one Internship document ever exists — this flag + unique index
    // enforces that, so GET/PUT always work against the same record.
    singleton: { type: Boolean, default: true, unique: true },

    heroEyebrow: { type: String, default: 'Internship Program' },
    heroTitle: {
      type: String,
      default: 'Start your career building real software, not just learning about it.',
    },
    heroDescription: {
      type: String,
      default:
        "AlgoHub's internship program pairs you with experienced engineers and designers to work on live projects — from day one.",
    },
    heroCtaText: { type: String, default: 'Apply Now' },
    heroCtaHref: { type: String, default: '/internships/apply' },

    tracksEyebrow: { type: String, default: 'Choose Your Path' },
    tracksTitle: { type: String, default: 'Internship Tracks' },
    tracks: { type: [trackSchema], default: [] },

    processEyebrow: { type: String, default: 'How It Works' },
    processTitle: { type: String, default: 'Application Process' },
    process: { type: [processStepSchema], default: [] },

    benefitsEyebrow: { type: String, default: 'What You Get' },
    benefitsTitle: { type: String, default: 'Program Benefits' },
    benefits: { type: [String], default: [] },

    ctaTitle: { type: String, default: 'Ready to gain real experience?' },
    ctaDescription: {
      type: String,
      default:
        'Applications are reviewed on a rolling basis — apply today to join the next intake.',
    },
    ctaButtonText: { type: String, default: 'Apply Now' },
    ctaButtonHref: { type: String, default: '/internships/apply' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Internship', internshipSchema);
module.exports.ICON_KEYS = ICON_KEYS;