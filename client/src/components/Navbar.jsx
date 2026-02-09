import { Link, NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPlaneDeparture, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');

  // ✅ SYNC SEARCH BAR WITH URL
  // If URL has ?search=Goa, put "Goa" in the box.
  // If user goes to Home, clear the box.
  useEffect(() => {
    if (location.pathname === '/tours') {
      setSearchTerm(searchParams.get('search') || '');
    } else {
      setSearchTerm('');
    }
  }, [location.pathname, searchParams]);



  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tours?search=${searchTerm.trim()}`);
      // ❌ REMOVED: setSearchTerm('') -> Now the text stays!
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Simple check: Is the key present?
    setIsAdmin(!!localStorage.getItem('adminKey'));
  }, [location.pathname]); // Re-check on route change (in case they just logged in/out)

  const handleLogout = () => {
    if (window.confirm("Logout from Admin?")) {
      localStorage.removeItem('adminKey');
      setIsAdmin(false);
      navigate('/');
      window.location.reload(); // Hard reload to clear any efficient state
    }
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 h-20 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <FaPlaneDeparture /> Deep Tours & Travels
        </Link>

        {/* Search Bar */}
        {/* Links */}
        <div className="flex items-center gap-6 font-medium text-gray-700">
          <NavLink to="/" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-lg scale-105' : 'hover:text-primary hover:bg-gray-50'}`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-lg scale-105' : 'hover:text-primary hover:bg-gray-50'}`}>About Us</NavLink>
          <NavLink to="/services" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-lg scale-105' : 'hover:text-primary hover:bg-gray-50'}`}>Services</NavLink>
          <NavLink to="/tours" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-lg scale-105' : 'hover:text-primary hover:bg-gray-50'}`}>Tours</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `px-4 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-lg scale-105' : 'hover:text-primary hover:bg-gray-50'}`}>Contact Us</NavLink>

          {/* ✅ ADMIN LINKS */}
          {isAdmin && (
            <>
              <Link to="/admin" className="text-purple-600 font-bold hover:text-purple-800 transition px-3 py-1">Dashboard</Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 text-sm font-bold border border-red-200 px-3 py-1 rounded hover:bg-red-50">Logout</button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;