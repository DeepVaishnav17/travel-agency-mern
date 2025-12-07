const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p className="text-sm text-gray-400">Last Updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you register, book a tour, or contact us. This includes your name, email address, phone number, and payment information.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">2. How We Use Your Information</h2>
              <p>We use your information to process bookings, send confirmation emails, provide customer support, and improve our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">3. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">4. Third-Party Services</h2>
              <p>We may use third-party services (like payment gateways) that collect, process, and store your data according to their own privacy policies.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-2">5. Contact Us</h2>
             
              <p>If you have questions about this policy, please contact us at <a href="mailto:hemalvaishnav2007@gmail.com" >
                              
                 <strong className="text-primary">hemalvaishnav2007@gmail.com</strong></a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

// import { FaFacebook, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   // Check if user is logged in
//   const token = localStorage.getItem('token');

//   return (
//     <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto border-t border-gray-800">
//       <div className="container mx-auto px-4">
        
//         {/* --- MAIN GRID LAYOUT (3 Columns) --- */}
//         <div className="grid md:grid-cols-3 gap-12 mb-12">
          
//           {/* COLUMN 1: Brand & Socials */}
//           <div className="space-y-6">
//             <div>
//                 <h2 className="text-3xl font-bold text-primary tracking-wider">Deep Tours & Travels</h2>
//                 <p className="text-sm text-gray-400 italic mt-1">Surprise Yourself to Inspire Yourself</p>
//             </div>
            
//             <p className="text-gray-400 leading-relaxed text-sm">
//               Deep Tours & Travels is a premier agency dedicated to creating unforgettable journeys. 
//               We run by young enthusiasts for social reformation and building the nation with moral values and ethics.
//             </p>

//             {/* Social Icons Row (Circular Style like Image) */}
//             <div className="flex gap-4">
//                 {/* Email */}
//                 <a href="mailto:hemalvaishnav2007@gmail.com" className="bg-white text-black h-10 w-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-white transition duration-300">
//                     <FaEnvelope size={18} />
//                 </a>

//                 {/* Instagram */}
//                 <a href="#" className="bg-white text-black h-10 w-10 flex items-center justify-center rounded-full hover:bg-pink-600 hover:text-white transition duration-300">
//                     <FaInstagram size={18} />
//                 </a>

//                 {/* Facebook */}
//                 <a href="#" className="bg-white text-black h-10 w-10 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-white transition duration-300">
//                     <FaFacebook size={18} />
//                 </a>

//                 {/* Location Icon (Clickable - Opens Maps) */}
//                 <a 
//                     href="https://www.google.com/maps/search/?api=1&query=Radheshyam+Complex+Bhavnagar+Gujarat" 
//                     target="_blank" 
//                     rel="noreferrer"
//                     className="bg-white text-black h-10 w-10 flex items-center justify-center rounded-full hover:bg-green-600 hover:text-white transition duration-300"
//                     title="View on Map"
//                 >
//                     <FaMapMarkerAlt size={18} />
//                 </a>
//             </div>
//           </div>

//           {/* COLUMN 2: Quick Links */}
//           <div>
//             <h3 className="text-xl font-bold text-orange-500 mb-6 uppercase tracking-wide">Quick Links</h3>
//             <ul className="space-y-3 text-gray-400 font-medium">
//                 <li><Link to="/" className="hover:text-white transition hover:translate-x-1 inline-block duration-300">Home</Link></li>
//                 <li><Link to="/tours" className="hover:text-white transition hover:translate-x-1 inline-block duration-300">Tours</Link></li>
                
//                 {/* ✅ LOGIC: Hide Login/Register if logged in */}
//                 {!token && (
//                   <>
//                     <li><Link to="/login" className="hover:text-white transition hover:translate-x-1 inline-block duration-300">Login</Link></li>
//                     <li><Link to="/register" className="hover:text-white transition hover:translate-x-1 inline-block duration-300">Register</Link></li>
//                   </>
//                 )}

//                 <li><a href="#" className="hover:text-white transition hover:translate-x-1 inline-block duration-300">Stories</a></li>
//             </ul>
//           </div>

//           {/* COLUMN 3: Contact Details (Static Text) */}
//           <div>
//             <h3 className="text-xl font-bold text-orange-500 mb-6 uppercase tracking-wide">Contact</h3>
            
//             <div className="space-y-6 text-gray-400 text-sm">
//                 <div>
//                     <h4 className="text-white font-bold text-lg mb-1">Bhavnagar (Head Office)</h4>
//                     {/* Static Text Address */}
//                     <p className="leading-relaxed">Radheshyam Complex, Madhavdarshan Complex<br/>Bhavnagar, Gujarat - 364001</p>
//                 </div>

//                 <div>
//                     <p className="font-bold text-white mb-1">Office Timings:</p>
//                     <p>9:00 AM to 7:00 PM</p>
//                 </div>

//                 <div className="space-y-2">
//                     <div className="flex items-center gap-3">
//                         <FaPhoneAlt size={14} className="text-primary" /> 
//                         <span className="text-white tracking-wide">+91 99791 20728</span>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <FaPhoneAlt size={14} className="text-primary" /> 
//                         <span className="text-white tracking-wide">+91 87587 98851</span>
//                     </div>
//                 </div>
//             </div>
//           </div>

//         </div>

//         {/* --- BOTTOM BAR --- */}
//         <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
//             <p>© {new Date().getFullYear()} Deep Tours & Travels. All rights reserved.</p>
            
//             <div className="flex gap-6 mt-4 md:mt-0">
//                 <Link to="/privacy-policy" target="_blank" className="hover:text-white transition">Privacy Policy</Link>
//                 <span>•</span>
//                 <Link to="/terms-conditions" target="_blank" className="hover:text-white transition">Terms and Conditions</Link>
//             </div>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;