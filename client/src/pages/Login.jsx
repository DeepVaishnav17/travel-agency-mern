import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // ✅ Added useLocation
import api from '../utils/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Hook to access the "return address" passed from TourDetails

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      toast.success('Login Successful!');
      
      // 🧠 SMART REDIRECT LOGIC
      // 1. Check if the user came from a specific page (like TourDetails)
      const origin = location.state?.from?.pathname;

      // 2. Decide where to go
      if (data.role === 'admin') {
          navigate('/admin'); // Admin always goes to Dashboard
      } else if (origin) {
          navigate(origin); // User goes back to the Tour Page they were viewing
      } else {
          navigate('/'); // Default to Home
      }
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition">
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          {/* ✅ Pass the 'from' state to Register page too, in case they switch flow */}
          New here? <Link to="/register" state={{ from: location.state?.from }} className="text-primary font-bold">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;