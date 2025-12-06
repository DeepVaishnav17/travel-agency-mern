const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true }, // e.g., "5 Days / 4 Nights"
  price: { type: Number, required: true },
  discountPrice: { type: Number }, // Optional
  desc: { type: String, required: true },
  
  // Images
  mainImage: { type: String, required: false },
  gallery: [String],

  // Itinerary (Scroll-based UI data)
  timeline: [{
    day: Number,
    title: String,
    desc: String
  }],

  // Details
  inclusions: [String],
  exclusions: [String],
  highlights: [String],

  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);