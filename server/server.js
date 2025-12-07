const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// --- MIDDLEWARE ---
app.use(express.json()); // Allows parsing JSON body
app.use(cors());         // ✅ Enables CORS for Vercel/Mobile/All
app.use(helmet());       // Adds security headers

// --- BASIC ROUTE ---
app.get('/', (req, res) => {
  res.send('Tours & Travels API is running...');
});

// --- API ROUTES ---
app.use('/api/auth', require('./routes/authRoutes'));         // Login, Register, Users
app.use('/api/tours', require('./routes/tourRoutes'));        // Tours (CRUD, Search)
app.use('/api/bookings', require('./routes/bookingRoutes'));  // Bookings
app.use('/api/contact', require('./routes/contactRoutes'));   // Contact Messages
app.use('/api/reviews', require('./routes/reviewRoutes'));    // Reviews
app.use('/api/config', require('./routes/configRoutes'));     // Admin Config
app.use('/api/upload', require('./routes/uploadRoutes'));     // ✅ Image Uploads

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});