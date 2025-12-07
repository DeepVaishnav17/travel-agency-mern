import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import { FaClock, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [tour, setTour] = useState(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  
  // 1. Store the "Real" User Profile (for resetting later)
  const [userProfile, setUserProfile] = useState(null);

  // 2. Form State
  const initialFormState = { fullName: '', email: '', phone: '', travelDate: '', travelers: 1 };
  const [bookingForm, setBookingForm] = useState(initialFormState);

  // --- EFFECT 1: Fetch Tour Details ---
  useEffect(() => {
    api.get(`/tours/${id}`)
      .then(res => setTour(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // --- EFFECT 2: 🧠 INSTANT AUTO-FILL LOGIC ---
  useEffect(() => {
    // Check Local Storage (Instant Access)
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    const savedForm = sessionStorage.getItem('pendingBooking');

    // Scenario A: User came back after forced login (Restore their typing)
    if (savedForm) {
        setBookingForm(JSON.parse(savedForm));
        sessionStorage.removeItem('pendingBooking');
        
        // Even if we restore a form, we still want to know who the real user is for future resets
        if (userInfo) {
            setUserProfile({ name: userInfo.name, email: userInfo.email });
        }
    } 
    // Scenario B: User is already logged in (Instant Auto-Fill)
    else if (userInfo) {
        // 1. Save real profile for resets
        setUserProfile({ name: userInfo.name, email: userInfo.email });
        
        // 2. Pre-fill the form immediately
        setBookingForm(prev => ({
            ...prev,
            fullName: userInfo.name, 
            email: userInfo.email
        }));
    }
  }, []);

  // --- HANDLER: Pre-Submit Check ---
  const handlePreSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // If NOT logged in: Save Data & Redirect to Login
    if (!token) {
        toast.info("Please Login to send an inquiry.");
        sessionStorage.setItem('pendingBooking', JSON.stringify(bookingForm));
        return navigate('/login', { state: { from: location } });
    }

    if(!bookingForm.fullName || !bookingForm.email || !bookingForm.phone || !bookingForm.travelDate) {
        return toast.error("Please fill in all required fields");
    }
    setShowInquiryModal(true); 
  };

  // --- HANDLER: Confirm Booking ---
  const confirmBooking = async () => {
    try {
      setShowInquiryModal(false);
      const totalPrice = bookingForm.travelers * tour.price;

      await api.post('/bookings', { ...bookingForm, tour: tour._id, totalPrice });

      toast.success('Inquiry Sent! Check your email.');
      
      // ✅ SMART RESET:
      // If user is logged in, reset Name/Email back to THEIR profile (undoing any edits for friends)
      // allowing them to book again easily.
      if (userProfile) {
          setBookingForm({ ...initialFormState, fullName: userProfile.name, email: userProfile.email });
      } else {
          setBookingForm(initialFormState);
      }

    } catch (error) {
      console.error(error);
      if(error.response && error.response.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate('/login');
      } else {
          toast.error('Booking failed. Please try again.');
      }
    }
  };

  const getYoutubeEmbed = (url) => {
    if(!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : url;
  };

  if (!tour) return <div className="text-center py-20 text-gray-500 font-bold">Loading details...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Image */}
      <div className="relative h-[60vh]">
        <img src={tour.mainImage} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 shadow-sm">{tour.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xl">
              <span className="flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm"><FaClock /> {tour.duration}</span>
              <span className="flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm"><FaMapMarkerAlt /> {tour.destination}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
        {/* LEFT COLUMN: Details */}
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Overview</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">{tour.desc}</p>
            <div className="mt-8 grid md:grid-cols-2 gap-6">
                 <div>
                    <h4 className="font-bold mb-2 text-green-700">Inclusions</h4>
                    <ul className="space-y-2">{tour.inclusions?.map((inc, i) => <li key={i} className="flex items-center gap-2 text-sm text-gray-600"><FaCheckCircle className="text-green-500" /> {inc}</li>)}</ul>
                 </div>
                 <div>
                    <h4 className="font-bold mb-2 text-red-700">Exclusions</h4>
                    <ul className="space-y-2">{tour.exclusions?.map((exc, i) => <li key={i} className="flex items-center gap-2 text-sm text-gray-600"><FaTimesCircle className="text-red-500" /> {exc}</li>)}</ul>
                 </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-2">Schedule</h2>
            <div className="relative border-l-4 border-orange-200 ml-4 space-y-10">
              {tour.timeline?.map((item, index) => (
                <div key={index} className="relative pl-8">
                  <span className="absolute -left-[14px] top-0 bg-orange-500 h-6 w-6 rounded-full border-4 border-white shadow-sm"></span>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Day {item.day}</span>
                  <h3 className="text-xl font-bold text-gray-800 mt-1">{item.title}</h3>
                  <p className="text-gray-500 mt-2 line-clamp-2">{item.desc}</p>
                  <button onClick={() => setSelectedDay(item)} className="text-orange-500 font-bold text-sm mt-2 hover:underline flex items-center gap-1 transition">Know more ↗</button>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2 text-gray-800">Happy Customers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tour.reviews?.map((review, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden border shadow-sm">
                    <div className="aspect-video bg-black">
                        <iframe width="100%" height="100%" src={getYoutubeEmbed(review.videoUrl)} title="Review" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className="p-4"><h4 className="font-bold text-gray-700">{review.customerName}</h4><div className="text-yellow-500 text-sm mt-1">★★★★★</div></div>
                </div>
              ))}
              {(!tour.reviews || tour.reviews.length === 0) && <p className="text-gray-500 italic">No video reviews added yet.</p>}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-xl sticky top-24 border border-gray-100">
            <div className="mb-6 text-center border-b pb-4">
              <span className="text-gray-500 block text-sm uppercase">Starting from</span>
              <span className="text-4xl font-bold text-primary">₹{tour.price.toLocaleString()}</span>
              <span className="text-xs text-gray-400">per person</span>
            </div>
            
            <form onSubmit={handlePreSubmit} className="space-y-4">
              {/* Editable Name (Auto-filled but changeable) */}
              <input 
                type="text" placeholder="Full Name" required 
                className="w-full border bg-gray-50 p-3 rounded focus:ring-2 focus:ring-primary outline-none" 
                value={bookingForm.fullName} 
                onChange={e => setBookingForm({...bookingForm, fullName: e.target.value})} 
              />
              {/* Editable Email */}
              <input 
                type="email" placeholder="Email" required 
                className="w-full border bg-gray-50 p-3 rounded focus:ring-2 focus:ring-primary outline-none" 
                value={bookingForm.email} 
                onChange={e => setBookingForm({...bookingForm, email: e.target.value})} 
              />
              <input 
                type="tel" placeholder="Phone" required 
                className="w-full border bg-gray-50 p-3 rounded focus:ring-2 focus:ring-primary outline-none" 
                value={bookingForm.phone} 
                onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} 
              />
              <div className="grid grid-cols-2 gap-3">
                 <input 
                    type="date" required 
                    className="w-full border bg-gray-50 p-3 rounded focus:ring-2 focus:ring-primary outline-none" 
                    value={bookingForm.travelDate} 
                    onChange={e => setBookingForm({...bookingForm, travelDate: e.target.value})} 
                 />
                 <input 
                    type="number" min="1" defaultValue="1" required 
                    className="w-full border bg-gray-50 p-3 rounded focus:ring-2 focus:ring-primary outline-none" 
                    value={bookingForm.travelers} 
                    onChange={e => setBookingForm({...bookingForm, travelers: e.target.value})} 
                 />
              </div>
              
              <div className="pt-2 flex justify-between font-bold text-gray-700">
                  <span>Total:</span>
                  <span className="text-primary">₹{(bookingForm.travelers * tour.price).toLocaleString()}</span>
              </div>
              
              <button type="submit" className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg transform hover:-translate-y-1">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* --- CONFIRMATION MODAL --- */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">Confirm Inquiry</h3>
            <p className="text-gray-600 mb-6">Send inquiry for <strong>{tour.title}</strong>?</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setShowInquiryModal(false)} className="px-6 py-2 border rounded hover:bg-gray-100">Cancel</button>
              <button onClick={confirmBooking} className="px-6 py-2 bg-primary text-white rounded font-bold shadow hover:bg-blue-600">Yes, Send</button>
            </div>
          </div>
        </div>
      )}

      {/* --- ITINERARY MODAL --- */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
                <button onClick={() => setSelectedDay(null)} className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-white text-black transition"><FaTimes size={20} /></button>
                <div className="h-64 relative">
                    <img src={selectedDay.image || tour.mainImage} alt={selectedDay.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8">
                        <div><span className="text-orange-400 font-bold uppercase tracking-widest text-sm mb-1 block">Day {selectedDay.day}</span><h2 className="text-3xl font-bold text-white leading-tight">{selectedDay.title}</h2></div>
                    </div>
                </div>
                <div className="p-8"><p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">{selectedDay.desc}</p></div>
            </div>
        </div>
      )}
    </div>
  );
};

export default TourDetails;