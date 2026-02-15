const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true }, // User's name
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Link to user account (Optional for guests)
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);