const Internship = require('../models/Internship');

// The content that currently lives hardcoded in the frontend — used to seed
// the very first document so the public page looks identical before anyone
// edits anything in the admin panel.
const DEFAULT_CONTENT = {
  singleton: true,
  tracks: [
    { title: 'Frontend Development', description: 'Work on real client UI using React and Tailwind CSS alongside senior engineers.', icon: 'layers' },
    { title: 'Backend Development', description: 'Build and maintain APIs, databases, and server-side logic for live products.', icon: 'server' },
    { title: 'UI/UX Design', description: 'Research, wireframe, and prototype interfaces in Figma for real projects.', icon: 'pen' },
    { title: 'AI & Data', description: 'Assist with model integration, data pipelines, and applied ML experiments.', icon: 'spark' },
    { title: 'Quality Assurance', description: 'Write test cases and catch issues before they reach production.', icon: 'shield' },
    { title: 'DevOps & Cloud', description: 'Get hands-on with CI/CD pipelines, Docker, and cloud deployments.', icon: 'cloud' },
  ],
  process: [
    { step: '01', title: 'Apply Online', description: "Submit your resume and a short note on what you'd like to work on." },
    { step: '02', title: 'Screening Call', description: 'A quick conversation to understand your background and interests.' },
    { step: '03', title: 'Technical Task', description: 'A small, practical task related to your chosen track.' },
    { step: '04', title: 'Onboarding', description: 'Join the team, get matched with a mentor, and start contributing.' },
  ],
  benefits: [
    'Mentorship from senior engineers and designers',
    'Hands-on work on real client projects',
    'Certificate of completion',
    'Letter of recommendation for top performers',
    'Flexible, remote-friendly schedule',
    'Path to a full-time offer',
  ],
};

// @route  GET /api/internship
// @access Public — creates the default document on first-ever request
const getInternship = async (req, res) => {
  try {
    let internship = await Internship.findOne({ singleton: true });
    if (!internship) {
      internship = await Internship.create(DEFAULT_CONTENT);
    }
    res.json({ internship });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// @route  PUT /api/internship
// @access Private (admin, editor)
const updateInternship = async (req, res) => {
  try {
    const {
      heroEyebrow, heroTitle, heroDescription, heroCtaText, heroCtaHref,
      tracksEyebrow, tracksTitle, tracks,
      processEyebrow, processTitle, process,
      benefitsEyebrow, benefitsTitle, benefits,
      ctaTitle, ctaDescription, ctaButtonText, ctaButtonHref,
    } = req.body;

    const update = {
      heroEyebrow, heroTitle, heroDescription, heroCtaText, heroCtaHref,
      tracksEyebrow, tracksTitle, tracks,
      processEyebrow, processTitle, process,
      benefitsEyebrow, benefitsTitle, benefits,
      ctaTitle, ctaDescription, ctaButtonText, ctaButtonHref,
    };

    // Remove undefined keys so a partial save never wipes out other fields
    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);

    const internship = await Internship.findOneAndUpdate(
      { singleton: true },
      { $set: update },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );

    res.json({ message: 'Internship page updated successfully', internship });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { getInternship, updateInternship };