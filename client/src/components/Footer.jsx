// import { FaFacebook, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   // Check if user is logged in
//   const token = localStorage.getItem('token');

//   return (
//     <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto border-t border-gray-800">
//       <div className="container mx-auto px-4">
        
//         {/* --- MAIN GRID LAYOUT --- */}
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

//             {/* Social Icons Row */}
//             <div className="flex gap-4">
//                 {/* Email */}
//                 <a href="mailto:hemalvaishnav2007@gmail.com" className="bg-white text-black p-2 rounded-full hover:bg-red-500 hover:text-white transition">
//                     <FaEnvelope size={18} />
//                 </a>

//                 {/* Location Icon (Clickable Emoji) */}
//                 <a 
//                     href="https://www.google.com/maps/search/?api=1&query=123,+Radheshyam+Complex,+Madhavdarshan,+Bhavnagar,+Gujarat+-+364001" 
//                     target="_blank" 
//                     rel="noreferrer"
//                     className="bg-white text-black p-2 rounded-full hover:bg-green-600 hover:text-white transition"
//                     title="View on Map"
//                 >
//                     <FaMapMarkerAlt size={18} />
//                 </a>
//             </div>
//           </div>

//           {/* COLUMN 2: Quick Links */}
//           <div>
//             <h3 className="text-xl font-bold text-orange-500 mb-6 uppercase tracking-wide">Quick Links</h3>
//             <ul className="space-y-3 text-gray-400">
//                 <li><Link to="/" className="hover:text-white transition hover:pl-2 duration-300">Home</Link></li>
//                 <li><Link to="/tours" className="hover:text-white transition hover:pl-2 duration-300">Tours</Link></li>
                
//                 {/* ✅ CONDITION: Only show Login/Register if User is NOT logged in */}
//                 {!token && (
//                   <>
//                     <li><Link to="/login" className="hover:text-white transition hover:pl-2 duration-300">Login</Link></li>
//                     <li><Link to="/register" className="hover:text-white transition hover:pl-2 duration-300">Register</Link></li>
//                   </>
//                 )}

//                 <li><a href="#" className="hover:text-white transition hover:pl-2 duration-300">Stories</a></li>
//             </ul>
//           </div>

//           {/* COLUMN 3: Contact Details */}
//           <div>
//             <h3 className="text-xl font-bold text-orange-500 mb-6 uppercase tracking-wide">Contact</h3>
            
//             <div className="space-y-4 text-gray-400 text-sm">
//                 <div>
//                     <h4 className="text-white font-bold text-lg mb-1">Bhavnagar (Head Office)</h4>
//                     <p>Radheshyam Complex, Madhavdarshan Complex<br/>Bhavnagar, Gujarat - 364001</p>
//                 </div>

//                 <div>
//                     <p className="font-semibold text-gray-500">Office Timings:</p>
//                     <p>9:00 AM to 7:00 PM</p>
//                 </div>

//                 <div className="space-y-1">
//                     <div className="flex items-center gap-2">
//                         <FaPhoneAlt size={12} className="text-primary" /> 
//                         <span>+91 99791 20728</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <FaPhoneAlt size={12} className="text-primary" /> 
//                         <span>+91 87587 98851</span>
//                     </div>
//                 </div>
//             </div>
//           </div>

//         </div>

//         {/* --- BOTTOM BAR: Copyright & Policies --- */}
//         <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
//             <p>© {new Date().getFullYear()} Deep Tours & Travels. All rights reserved.</p>
            
//             <div className="flex gap-6 mt-4 md:mt-0">
//                 <a href="/privacy-policy" target="_blank" className="hover:text-white transition">Privacy Policy</a>
//                 <span>•</span>
//                 <a href="/terms-conditions" target="_blank" className="hover:text-white transition">Terms and Conditions</a>
//             </div>
//         </div>

//       </div>
//     </footer>
//   );
// };

// export default Footer;
import { FaFacebook, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Check if user is logged in
  const token = localStorage.getItem('token');

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4">
        
        {/* --- MAIN GRID LAYOUT --- */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* COLUMN 1: Brand & Socials */}
          <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-primary tracking-wider">Deep Tours & Travels</h2>
                <p className="text-sm text-gray-400 italic mt-1">Surprise Yourself to Inspire Yourself</p>
            </div>
            
            <p className="text-gray-400 leading-relaxed text-sm">
              Deep Tours & Travels is a premier agency dedicated to creating unforgettable journeys. 
              We run by young enthusiasts for social reformation and building the nation with moral values and ethics.
            </p>

            {/* Social Icons Row */}
            <div className="flex gap-4">
                {/* Email */}
                <a href="mailto:hemalvaishnav2007@gmail.com" className="bg-white text-black p-2 rounded-full hover:bg-red-500 hover:text-white transition">
                    <FaEnvelope size={18} />
                </a>

                {/* Location Icon (Clickable Emoji) - ✅ FIXED LINK */}
                <a 
                    href="https://www.google.com/maps/search/?api=1&query=Radheshyam+Complex+Bhavnagar+Gujarat" 
                    target="_blank" 
                    rel="noreferrer"
                    className="bg-white text-black p-2 rounded-full hover:bg-green-600 hover:text-white transition"
                    title="View on Map"
                >
                    <FaMapMarkerAlt size={18} />
                </a>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-6 uppercase tracking-wide">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
                <li><Link to="/" className="hover:text-white transition hover:pl-2 duration-300">Home</Link></li>
                <li><Link to="/tours" className="hover:text-white transition hover:pl-2 duration-300">Tours</Link></li>
                
                {/* ✅ CONDITION: Only show Login/Register if User is NOT logged in */}
                {!token && (
                  <>
                    <li><Link to="/login" className="hover:text-white transition hover:pl-2 duration-300">Login</Link></li>
                    <li><Link to="/register" className="hover:text-white transition hover:pl-2 duration-300">Register</Link></li>
                  </>
                )}

                <li><a href="#" className="hover:text-white transition hover:pl-2 duration-300">Stories</a></li>
            </ul>
          </div>

          {/* COLUMN 3: Contact Details */}
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-6 uppercase tracking-wide">Contact</h3>
            
            <div className="space-y-4 text-gray-400 text-sm">
                <div>
                    <h4 className="text-white font-bold text-lg mb-1">Bhavnagar (Head Office)</h4>
                    
                    {/* ✅ CLICKABLE ADDRESS (Safe Link) */}
                    <a 
                        href="https://www.google.com/maps/search/?api=1&query=Radheshyam+Complex+Bhavnagar+Gujarat"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary transition block"
                    >
                        Radheshyam Complex, Madhavdarshan Complex<br/>Bhavnagar, Gujarat - 364001
                    </a>
                </div>

                <div>
                    <p className="font-semibold text-gray-500">Office Timings:</p>
                    <p>9:00 AM to 7:00 PM</p>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <FaPhoneAlt size={12} className="text-primary" /> 
                        <span>+91 99791 20728</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaPhoneAlt size={12} className="text-primary" /> 
                        <span>+91 87587 98851</span>
                    </div>
                </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR: Copyright & Policies --- */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Deep Tours & Travels. All rights reserved.</p>
            
            <div className="flex gap-6 mt-4 md:mt-0">
                <a href="/privacy-policy" target="_blank" className="hover:text-white transition">Privacy Policy</a>
                <span>•</span>
                <a href="/terms-conditions" target="_blank" className="hover:text-white transition">Terms and Conditions</a>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;