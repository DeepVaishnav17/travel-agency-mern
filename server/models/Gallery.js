const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Happy Travelers' // Can be 'Domestic', 'International', etc. later
    },
    isFeatured: {
        type: Boolean,
        default: false // Determines if it shows up on the Home page
    }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
