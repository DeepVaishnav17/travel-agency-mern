const express = require('express');
const { upload } = require('../config/cloudinary');
const router = express.Router();

const { checkAdminKey } = require('../middleware/adminAuth');


router.post('/', checkAdminKey, upload.single('image'), (req, res) => {
  res.send(req.file.path);
});

module.exports = router;