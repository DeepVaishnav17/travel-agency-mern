import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
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

        {/* Links */}
        <div className="flex items-center gap-6 font-medium text-gray-700">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <Link to="/tours" className="hover:text-primary transition">Tours</Link>

          {/* ✅ ADMIN LINKS */}
          {isAdmin && (
            <>
              <Link to="/admin" className="text-purple-600 font-bold hover:text-purple-800 transition">Dashboard</Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700 text-sm">Logout</button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;