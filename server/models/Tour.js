const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: false },
  desc: { type: String, required: false },


  mainImage: { type: String, required: false },


  timeline: [{
    day: Number,
    title: String,
    desc: String,
    image: String
  }],


  reviews: [{
    customerName: String,
    videoUrl: String
  }],


  inclusions: [String],
  exclusions: [String],

  category: { type: String, default: 'Domestic' },

  isFeatured: { type: Boolean, default: false },


  brochure: { type: String, required: false },


  isArchived: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);