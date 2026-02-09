const Contact = require('../models/Contact');
const { sendContactEmail } = require('../config/email'); // Import the specific email function


const submitContact = async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;


    const newContact = await Contact.create({ name, email, phone, category, message });


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


const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { submitContact, getAllContacts };