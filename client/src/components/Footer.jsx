import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-auto">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Wanderlust Travels</h2>
          <p className="text-gray-400">Making your dream vacations a reality. Join us for unforgettable experiences.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="text-gray-400 space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/tours" className="hover:text-white">Tours</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            <FaFacebook className="cursor-pointer hover:text-blue-500" />
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <FaTwitter className="cursor-pointer hover:text-blue-400" />
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-10 border-t border-gray-800 pt-4">
        © 2024 Wanderlust Travels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;