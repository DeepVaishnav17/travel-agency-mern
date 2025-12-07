import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-primary">Deep Tours & Travels Travels</h2>
          <p className="text-gray-400 leading-relaxed">
            Making your dream vacations a reality. We provide the best tour packages tailored to your needs.
          </p>
        </div>

        {/* Contact Info (Replaces Quick Links) */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <div className="space-y-4 text-gray-400">
            <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-primary shrink-0" />
                <p>Radheshyam Complex, Madhavdarshan<br/>Bhavnagar, Gujarat - 364001</p>
            </div>
            <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary shrink-0" />
                <p>+91 9979120728</p>
            </div>
            <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary shrink-0" />
                <p>hemalvaishnav2007@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold mb-4">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
          </div>
        </div>

      </div>
      
      {/* Copyright */}
      <div className="text-center text-gray-600 mt-12 border-t border-gray-800 pt-6">
        © {new Date().getFullYear()} Wanderlust Travels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;