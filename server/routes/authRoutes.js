const express = require('express');
// ✅ Import getAllUsers
const { registerUser, loginUser, getMe, getAllUsers } = require('../controllers/authController');
// ✅ Import 'admin' middleware
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// ✅ NEW ROUTE: Get All Users (Admin Only)
// This enables the "Users" tab in your Admin Dashboard
router.get('/users', protect, admin, getAllUsers);

module.exports = router;