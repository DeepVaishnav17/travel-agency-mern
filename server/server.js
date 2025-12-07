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
const authRoutes = require('./routes/authRoutes');
const tourRoutes = require('./routes/tourRoutes');
const configRoutes = require('./routes/configRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Basic Route
app.get('/', (req, res) => {
  res.send('Tours & Travels API is running...');
});
app.use('/api/contact', require('./routes/contactRoutes'));

// Import Routes (We will create these in Phase 2)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tours', require('./routes/tourRoutes'));
//app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/config', require('./routes/configRoutes')); // For Admin Banners
// ... other imports
app.use('/api/bookings', require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});