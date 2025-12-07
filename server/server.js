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
app.use(helmet());       // Adds security headers

// ✅ FIX: CORS Configuration
// We must explicitly list the domains allowed to access the backend
app.use(cors({
  origin: [
    "https://travel-agency-mern-beta.vercel.app", // Your deployed Frontend (Vercel)
    "http://localhost:5173",                      // Your local development (Vite)
    "http://localhost:3000"                       // Backup local port
  ],
  credentials: true, // Allow cookies and authorization headers
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"]
}));

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