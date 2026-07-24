const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// @route  POST /api/contact
// @access Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const contact = await Contact.create({ name, email, subject, message });

    // Email notification — failure here shouldn't fail the whole request,
    // since the submission is already safely saved in the database either way.
    try {
      await sendEmail({
        to: process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER,
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      });
    } catch (emailErr) {
      console.error('Contact notification email failed to send:', emailErr.message);
    }

    res.status(201).json({ message: "Thanks — your message has been sent. We'll be in touch soon." });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { submitContact };