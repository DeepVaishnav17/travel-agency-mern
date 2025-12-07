const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true }, 
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  
  // Main Cover Image
  mainImage: { type: String, required: false },

  // Timeline (Day-wise Itinerary)
  timeline: [{
    day: Number,
    title: String,
    desc: String,
    image: String 
  }],

  // Video Reviews
  reviews: [{
    customerName: String,
    videoUrl: String 
  }],

  // Details
  inclusions: [String],
  exclusions: [String],
  
  isFeatured: { type: Boolean, default: false },
  
  // ✅ NEW FIELD: ARCHIVE SUPPORT
  isArchived: { type: Boolean, default: false } 
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);