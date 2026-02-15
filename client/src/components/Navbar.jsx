import { Link, NavLink, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPlaneDeparture, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Synced Search Logic
  useEffect(() => {
    if (location.pathname === '/tours') {
      setSearchTerm(searchParams.get('search') || '');
    } else {
      setSearchTerm('');
    }
    setIsMobileMenuOpen(false); // Close mobile menu on route change
  }, [location.pathname, searchParams]);

  // Scroll Effect for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tours?search=${searchTerm.trim()}`);
    }
  };

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminKey'));
  }, [location.pathname]);

  const handleLogout = () => {
    if (window.confirm("Logout from Admin?")) {
      localStorage.removeItem('adminKey');
      setIsAdmin(false);
      navigate('/');
      window.location.reload();
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/tours?category=Domestic", label: "Domestic" },
    { path: "/tours?category=International", label: "International" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-white/80 backdrop-blur-sm'
        }`}
    >
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2 tracking-tight hover:opacity-80 transition z-50">
          <div className="bg-primary/10 p-2 rounded-lg text-primary">
            <FaPlaneDeparture size={20} />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-800">Deep Tours & Travels</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden lg:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'}`}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* DESKTOP RIGHT (Admin) */}
        <div className="hidden lg:flex items-center gap-4">
          {isAdmin && (
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <Link to="/admin" className="text-sm font-semibold text-gray-600 hover:text-primary transition">Dashboard</Link>
              <button onClick={handleLogout} className="text-xs font-bold text-red-500 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full hover:bg-red-100 transition">Logout</button>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="lg:hidden text-gray-600 focus:outline-none z-50 p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl lg:hidden flex flex-col p-6 space-y-4 max-h-[80vh] overflow-y-auto"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `block px-4 py-3 rounded-xl text-lg font-medium transition-all ${isActive ? 'bg-primary/5 text-primary pl-6 border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50 hover:pl-6'}`}
                >
                  {link.label}
                </NavLink>
              ))}

              {isAdmin && (
                <div className="pt-4 border-t border-gray-100 mt-4 space-y-3">
                  <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-2 font-bold text-gray-800">Admin Dashboard</Link>
                  <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="block w-full text-left px-4 py-2 text-red-500 font-bold">Logout</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;