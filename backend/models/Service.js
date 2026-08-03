const mongoose = require('mongoose');

// Keep this list in sync with the icon registry on the frontend
// (frontend/src/utils/serviceIcons.jsx). Adding an icon there? Add its key here too.
const ICON_KEYS = ['code', 'globe', 'phone', 'spark', 'cloud', 'pen', 'plug', 'shield'];

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    href: {
      type: String,
      required: [true, 'Link is required'],
      trim: true,
    },
    icon: {
      type: String,
      enum: ICON_KEYS,
      default: 'code',
    },
    order: {
      type: Number,
      default: 0, // lower numbers show first on the public Services page
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
module.exports.ICON_KEYS = ICON_KEYS;