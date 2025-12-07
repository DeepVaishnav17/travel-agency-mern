import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPlaneDeparture, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  
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

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tours?search=${searchTerm.trim()}`);
      // ❌ REMOVED: setSearchTerm('') -> Now the text stays!
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
        <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3 border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition">
          <FaSearch className="text-gray-400 mr-2 cursor-pointer" onClick={handleSearch} />
          <input 
            type="text" 
            placeholder="Search destination..." 
            className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        {/* Links & Auth */}
        <div className="flex items-center gap-6 font-medium text-gray-700">
          <div className="hidden md:flex gap-6">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <Link to="/tours" className="hover:text-primary transition">Tours</Link>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">{user.name}</span>
              {user.role === 'admin' && (
                 <Link to="/admin" className="bg-gray-800 text-white px-3 py-1 rounded text-sm hover:bg-black transition">Admin</Link>
              )}
              <button onClick={handleLogout} className="text-red-500 text-sm hover:text-red-700 transition">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-primary text-white px-5 py-2 rounded-full hover:bg-blue-600 transition shadow-md">
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;