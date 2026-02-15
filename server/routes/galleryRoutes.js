const express = require('express');
const router = express.Router();
const { getGallery, addImage, deleteImage } = require('../controllers/galleryController');
const { upload } = require('../config/cloudinary');
const { checkAdminKey } = require('../middleware/adminAuth');

router.get('/', getGallery);
router.post('/', checkAdminKey, upload.single('image'), addImage);
router.delete('/:id', checkAdminKey, deleteImage);

module.exports = router;
