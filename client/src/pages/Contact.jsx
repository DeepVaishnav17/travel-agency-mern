import { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import SEO from '../components/SEO';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaLightbulb } from 'react-icons/fa';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Inquiry',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/contact', formData);
      toast.success(
        formData.category === 'Suggestion'
          ? 'Thanks for your suggestion! We appreciate your feedback.'
          : 'Message sent! We will get back to you soon.'
      );
      setFormData({ name: '', email: '', phone: '', category: 'General Inquiry', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20">
      <SEO
        title="Contact Us"
        description="Get in touch with Deep Tours & Travels for bookings, inquiries, or customizations. We are here to help you."
        keywords="contact deep tours, travel agency contact, booking inquiry"
        url="/contact"
      />

      {/* Header Section */}
      <div className="py-24 bg-gray-50 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="pattern-hex" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="currentColor" className="text-primary"></path>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-hex)"></rect>
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block animate-bounce">We're here for you</span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">Get in Touch</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Have a question about a tour? Want to customize your trip?
            <br className="hidden md:block" /> We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-20">

          {/* Left Side: Info & Map */}
          <div className="space-y-12">

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <FaMapMarkerAlt size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Visit Us</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Radheshyam Complex, Madhav Darshan,<br />
                  Bhavnagar, Gujarat, India - 364001
                </p>
              </div>

              <div className="p-8 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <FaEnvelope size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Contact Info</h3>
                <p className="text-gray-500 text-sm mb-1">
                  <span className="font-semibold text-gray-700">Support:</span> hemalvaishnav@gmail.com
                </p>
                <p className="text-gray-500 text-sm">
                  <span className="font-semibold text-gray-700">Phone:</span> +91 99791 20728
                </p>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-gray-200 rounded-[2rem] overflow-hidden h-96 shadow-inner relative group">
              <iframe
                title="Office Location"
                src="https://maps.google.com/maps?q=Radheshyam+Complex,+Madhav+Darshan,+Bhavnagar,+Gujarat,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) contrast(1.2) opacity(0.8)" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-700 group-hover:filter-none group-hover:opacity-100"
              ></iframe>
              <div className="absolute inset-0 bg-primary/10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500"></div>
            </div>

            {/* Suggestion Box Highlight */}
            <div className="bg-purple-50 p-8 rounded-3xl border border-purple-100 flex items-start gap-4">
              <FaLightbulb className="text-yellow-500 text-2xl flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-bold text-purple-900 mb-2">Got a Suggestion?</h4>
                <p className="text-purple-700 text-sm leading-relaxed">
                  Select "Suggestion" in the form. We reward the best ideas with discount coupons!
                </p>
              </div>
            </div>

          </div>

          {/* Right Side: The Form */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>

            <h3 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name & Phone Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Your Name</label>
                  <input
                    type="text" name="name" required placeholder="John Doe"
                    value={formData.name} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all outline-none font-medium text-gray-800 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                  <input
                    type="tel" name="phone" placeholder="+91 99999 88888"
                    value={formData.phone} onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all outline-none font-medium text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input
                  type="email" name="email" required placeholder="john@example.com"
                  value={formData.email} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all outline-none font-medium text-gray-800 placeholder-gray-400"
                />
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Topic</label>
                <div className="relative">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all outline-none font-medium text-gray-800 appearance-none cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Tour Customization">I want to customize a Tour</option>
                    <option value="Suggestion">I have a Suggestion / Feedback</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none text-gray-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </div>
                </div>
              </div>

              {/* Message Area */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Message</label>
                <textarea
                  name="message" required rows="5"
                  placeholder={formData.category === 'Suggestion' ? "Tell us your brilliant idea..." : "How can we help you?"}
                  value={formData.message} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white focus:border-transparent transition-all outline-none resize-none font-medium text-gray-800 placeholder-gray-400"
                ></textarea>
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-primary hover:bg-purple-800 text-white font-bold py-5 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;