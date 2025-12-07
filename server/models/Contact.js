const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  category: { 
    type: String, 
    required: true, 
    enum: ['General Inquiry', 'Tour Customization', 'Suggestion', 'Complaint', 'Other'],
    default: 'General Inquiry' 
  },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false } // Admin can mark as read later
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);