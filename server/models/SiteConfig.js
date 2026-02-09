const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
  // Dynamic Homepage Banners
  banners: [{
    imageUrl: String,
    title: String,
    subtitle: String
  }],
  // Dynamic Contact Details
  contactEmail: String,
  contactPhone: String,
  contactAddress: String,
  homeLayout: {
    type: Array, // [{ id: 'hero', label: 'Hero', isVisible: true, order: 1 }]
    default: [
      { id: 'hero', label: 'Hero Section', isVisible: true, order: 1 },
      { id: 'domestic', label: 'Domestic Tours', isVisible: true, order: 2 },
      { id: 'international', label: 'International Tours', isVisible: true, order: 3 },
      { id: 'whyChooseUs', label: 'Why Choose Us', isVisible: true, order: 4 },
      { id: 'testimonials', label: 'Testimonials', isVisible: true, order: 5 },
      { id: 'cta', label: 'Call to Action', isVisible: true, order: 6 }
    ]
  },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteConfig', siteConfigSchema);