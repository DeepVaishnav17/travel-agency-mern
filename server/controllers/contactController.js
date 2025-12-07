const Contact = require('../models/Contact');
const { sendContactEmail } = require('../config/email'); // Import the specific email function

// @desc    Submit a Contact Form
// @route   POST /api/contact
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;

    // 1. Save to Database
    const newContact = await Contact.create({ name, email, phone, category, message });

    // 2. Send Email to Admin
    // We use a try-catch block here so if email fails, the message is still saved in DB
    try {
        await sendContactEmail({ name, email, phone, category, message });
    } catch (emailError) {
        console.error("Email failed to send:", emailError);
    }

    res.status(201).json({ message: 'Message sent successfully!', contact: newContact });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not send message.' });
  }
};

// @desc    Get all messages (Admin)
// @route   GET /api/contact
// ✅ THIS FUNCTION WAS MISSING, CAUSING YOUR CRASH
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ EXPORT BOTH FUNCTIONS
module.exports = { submitContact, getAllContacts };