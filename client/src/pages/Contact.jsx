import { useState } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaLightbulb } from 'react-icons/fa';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Inquiry', // Default
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
    <div className="bg-gray-50 min-h-screen pt-12 pb-20">
      
      {/* Header Section */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Have a question about a tour? Want to customize your trip? 
          Or maybe you have a <span className="text-secondary font-bold">Suggestion</span> for us? 
          We'd love to hear from you!
        </p>
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
        
        {/* Left Side: Contact Info */}
        <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition duration-300">
                <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                    <FaMapMarkerAlt /> Visit Us
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                    123, Travel Street, Tourism Hub,<br/>
                    Ahmedabad, Gujarat, India - 380001
                </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transform hover:-translate-y-1 transition duration-300">
                <h3 className="text-2xl font-bold mb-6 text-primary flex items-center gap-2">
                    <FaEnvelope /> Email & Phone
                </h3>
                <p className="text-gray-600 text-lg mb-2">
                    <span className="font-bold">Support:</span> help@wanderlust.com
                </p>
                <p className="text-gray-600 text-lg">
                    <span className="font-bold">Call Us:</span> +91 98765 43210
                </p>
            </div>
            
            {/* Suggestion Box Highlight */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-2">
                    <FaLightbulb className="text-yellow-500" /> Got a Suggestion?
                </h4>
                <p className="text-blue-700">
                    Select "Suggestion" in the form. We reward the best ideas with discount coupons!
                </p>
            </div>
        </div>

        {/* Right Side: The Form */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name & Phone Row */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                    <input 
                        type="text" name="name" required placeholder="John Doe"
                        value={formData.name} onChange={handleChange}
                        className="w-full border-gray-200 bg-gray-50 border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input 
                        type="tel" name="phone" placeholder="+91 99999 88888"
                        value={formData.phone} onChange={handleChange}
                        className="w-full border-gray-200 bg-gray-50 border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition outline-none"
                    />
                </div>
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input 
                    type="email" name="email" required placeholder="john@example.com"
                    value={formData.email} onChange={handleChange}
                    className="w-full border-gray-200 bg-gray-50 border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition outline-none"
                />
            </div>

            {/* Category Selector (The Suggestions Thing) */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What is this about?</label>
                <div className="relative">
                    <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}
                        className="w-full border-gray-200 bg-gray-50 border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition outline-none appearance-none cursor-pointer"
                    >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Tour Customization">I want to customize a Tour</option>
                        <option value="Suggestion">💡 I have a Suggestion / Feedback</option>
                        <option value="Complaint">Complaint</option>
                        <option value="Other">Other</option>
                    </select>
                    {/* Arrow Icon */}
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                </div>
            </div>

            {/* Message Area */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    {formData.category === 'Suggestion' ? 'Tell us your idea!' : 'How can we help you?'}
                </label>
                <textarea 
                    name="message" required rows="5"
                    placeholder={formData.category === 'Suggestion' ? "We should add a night trek to the Manali package..." : "I'm interested in the Bali package..."}
                    value={formData.message} onChange={handleChange}
                    className="w-full border-gray-200 bg-gray-50 border px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition outline-none resize-none"
                ></textarea>
            </div>

            <button 
                type="submit" disabled={loading}
                className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2"
            >
                {loading ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;