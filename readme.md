# 🌍 WanderLust - MERN Travel Agency Application

A robust and modern Travel Agency website built using the MERN stack (MongoDB, Express, React, Node.js). It features a dynamic tour management system, admin dashboard, user inquiries, and responsive design.

## 🚀 Features

### User Features
- **Interactive Home Page:** Dynamic sections (Hero, Domestic/International Tours, Why Choose Us, Testimonials) controlled by Admin.
- **Tour Packages:** Browse Domestic and International tours with detailed itineraries, inclusions, and pricing.
- **Services Page:** Overview of services like Flight Booking, Hotel Reservations, Visa Assistance, etc.
- **Contact Us:** Interactive form with "Suggestion" box and embedded Google Map location.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.
- **Modern UI:** Clean, professional aesthetics with smooth animations and transitions.

### Admin Dashboard (Protected Route)
- **Manage Tours:** Create, Edit, Archive, and Delete tour packages.
- **Manage Messages:** View and categorize user inquiries (General, Customization, Suggestions).
- **Manage Reviews:** View and delete user reviews.
- **Page Layout:** Reorder and toggle visibility of Home page sections dynamically (Drag & Drop interface).
- **Secure Access:** Requires a secret Admin Key to access.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router DOM, Framer Motion, React Icons, Axios, React Toastify.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (with Mongoose ODM).
- **Media Storage:** Cloudinary (for tour images).
- **Deployment:** Vercel (Frontend), Render (Backend).

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas Account (or local MongoDB)
- Cloudinary Account (for image uploads)
- Git

## 🔧 Installation & Setup

Clone the repository:
```bash
git clone https://github.com/yourusername/travel-agency-mern.git
cd travel-agency-mern
```

### 1. Backend Setup
Navigate to the `server` directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
ADMIN_SECRET_KEY=your_secure_admin_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:
```bash
npm start
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup
Navigate to the `client` directory:
```bash
cd ../client
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The app will run on `http://localhost:5173`.

## 🌐 API Endpoints

- **GET /api/tours**: Fetch all active tours.
- **POST /api/tours**: Create a new tour (Admin only).
- **PUT /api/tours/:id**: Update a tour (Admin only).
- **DELETE /api/tours/:id**: Delete a tour (Admin only).
- **POST /api/contact**: Submit a contact form inquiry.
- **GET /api/config**: Fetch site configuration (layout, etc.).
- **PUT /api/config**: Update site configuration (Admin only).

## 🚀 Deployment

### Backend (Render/Heroku/Railway)
1.  Ensure you have a `start` script in `server/package.json`: `"start": "node index.js"`.
2.  Set environment variables (`MONGO_URI`, `ADMIN_SECRET_KEY`, etc.) in your hosting provider's dashboard.
3.  Deploy the root repository or point the root directory to `server`.

### Frontend (Vercel/Netlify)
1.  Ensure `vercel.json` exists in `client/` for SPA routing support.
2.  Set the Root Directory to `client` in project settings.
3.  Deploy the repository.

## 📧 Contact & Support

For support, email **hemalvaishnav**.
Office: Radheshyam Complex, Madhav Darshan, Bhavnagar, Gujarat, India.

---
**Developed with ❤️ by Deep Tours & Travels Team**
