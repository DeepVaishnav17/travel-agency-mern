import { Link, useNavigate } from 'react-router-dom';
import { FaPlaneDeparture, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <FaPlaneDeparture /> Wanderlust
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/tours" className="hover:text-primary transition">Tours</Link>
          {/* <Link to="/contact" className="hover:text-primary transition">Contact</Link> */}
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">{user.name}</span>
              {user.role === 'admin' && (
                 <Link to="/admin" className="bg-gray-800 text-white px-3 py-1 rounded text-sm">Admin</Link>
              )}
              <button onClick={handleLogout} className="text-red-500 text-sm">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-primary text-white px-5 py-2 rounded-full hover:bg-blue-600 transition">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;