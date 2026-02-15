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
        default: 'Happy Travelers'
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
