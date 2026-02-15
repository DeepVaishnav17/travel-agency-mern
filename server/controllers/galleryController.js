const Gallery = require('../models/Gallery');
const { cloudinary } = require('../config/cloudinary');


const getGallery = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


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
            publicId: req.file.filename
        });

        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const deleteImage = async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }


        try {
            if (image.publicId) {
                await cloudinary.uploader.destroy(image.publicId);
            }
        } catch (err) {
            console.error("Cloudinary delete failed (ignoring to allow DB delete):", err);
        }


        if (image.deleteOne) {
            await image.deleteOne();
        } else {

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
