import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // ✅ Added useLocation
import api from '../utils/api';
import { toast } from 'react-toastify';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Hook to access the "return address" passed from TourDetails

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      
      // Save credentials
      localStorage.setItem('userInfo', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      
      toast.success('Account Created! Welcome.');

      // 🧠 SMART REDIRECT LOGIC
      // Check if there is a specific return address (like a Tour Page)
      // If yes, go there. If no, go Home.
      const origin = location.state?.from?.pathname || '/';
      navigate(origin);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition">
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          {/* ✅ Pass the 'from' state to Login page too, in case they switch flow */}
          Already have an account? <Link to="/login" state={{ from: location.state?.from }} className="text-primary font-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;