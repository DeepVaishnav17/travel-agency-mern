const express = require('express');
// ✅ Import getMe
const { registerUser, loginUser, getMe } = require('../controllers/authController');
// ✅ Import protect middleware
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// ✅ NEW ROUTE: Get current user info (Protected)
router.get('/me', protect, getMe);

module.exports = router;