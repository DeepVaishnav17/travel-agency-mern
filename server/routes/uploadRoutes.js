const express = require('express');
const { upload } = require('../config/cloudinary');
const router = express.Router();

const { checkAdminKey } = require('../middleware/adminAuth');


router.post('/', checkAdminKey, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error("[Upload] Error:", err.message);
      return res.status(400).json({ message: "Image upload failed", error: err.message });
    }
    if (!req.file) {
      console.error("[Upload] No file received");
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log("[Upload] Success:", req.file.path);
    res.send(req.file.path);
  });
});

router.post('/file', checkAdminKey, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error("[Upload] Brochure Error:", err.message);
      return res.status(400).json({ message: "File upload failed", error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.send(req.file.path);
  });
});

module.exports = router;