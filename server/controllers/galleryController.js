const Gallery = require('../models/Gallery');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Add new image
// @route   POST /api/gallery
// @access  Private/Admin
const addImage = async (req, res) => {
    try {
        const { title, category, isFeatured } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const newImage = new Gallery({
            title,
            category,
            isFeatured: isFeatured === 'true',
            imageUrl: req.file.path,
            publicId: req.file.filename // Saved from Cloudinary
        });

        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteImage = async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Delete from Cloudinary (Attempt only)
        try {
            if (image.publicId) {
                await cloudinary.uploader.destroy(image.publicId);
            }
        } catch (err) {
            console.error("Cloudinary delete failed (ignoring to allow DB delete):", err);
        }

        // Delete from DB (Always)
        if (image.deleteOne) {
            await image.deleteOne();
        } else {
            // Fallback for older Mongoose versions
            await Gallery.findByIdAndDelete(req.params.id);
        }

        res.json({ message: 'Image removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getGallery,
    addImage,
    deleteImage
};
