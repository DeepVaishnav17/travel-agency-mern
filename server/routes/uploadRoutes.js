const express = require('express');
const { upload } = require('../config/cloudinary');
const router = express.Router();

// Upload endpoint that returns the URL
router.post('/', upload.single('image'), (req, res) => {
  res.send(req.file.path); // Returns the Cloudinary URL
});

module.exports = router;