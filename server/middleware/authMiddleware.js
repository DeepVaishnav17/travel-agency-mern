const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);


      const userId = decoded.id || decoded._id;
      req.user = await User.findById(userId).select('-password');

      if (!req.user) {
        console.log("Admin Check: User not found in DB with ID:", userId);
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {

  console.log("Current User Role:", req.user?.role);

  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };