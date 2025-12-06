import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { FaClock, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
    
    const navigate = useNavigate();
  const [bookingForm, setBookingForm] = useState({
    fullName: '', email: '', phone: '', travelDate: '', travelers: 1
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      // Calculate total price (rough estimate)
      const totalPrice = bookingForm.travelers * tour.price;

      await api.post('/bookings', {
        ...bookingForm,
        tour: tour._id,
        totalPrice
      });

      toast.success('Inquiry Sent! We will contact you shortly.');
      navigate('/'); // Redirect to home
    } catch (error) {
      toast.error('Booking failed. Please try again.');
    }
  };

  useEffect(() => {
    api.get(`/tours/${id}`)
      .then(res => setTour(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!tour) return <div className="text-center py-20">Loading details...</div>;

  return (
    <div>
      {/* Header Image */}
      <div className="relative h-[60vh]">
        <img src={tour.mainImage} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{tour.title}</h1>
            <div className="flex items-center justify-center gap-6 text-xl">
              <span className="flex items-center gap-2"><FaClock /> {tour.duration}</span>
              <span className="flex items-center gap-2"><FaMapMarkerAlt /> {tour.destination}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
        {/* Left Column: Details & Itinerary */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{tour.desc}</p>
          </section>

          {/* ITINERARY (Timeline UI) */}
          <section>
            <h2 className="text-2xl font-bold mb-8">Itinerary</h2>
            <div className="relative border-l-4 border-blue-200 ml-4 space-y-8">
              {tour.timeline?.map((item, index) => (
                <div key={index} className="relative pl-8">
                  {/* Dot */}
                  <span className="absolute -left-[14px] top-0 bg-primary h-6 w-6 rounded-full border-4 border-white"></span>
                  
                  <h3 className="text-xl font-bold text-gray-800">Day {item.day}: {item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tour.gallery?.map((img, idx) => (
                <img key={idx} src={img} alt="Gallery" className="rounded-lg h-32 w-full object-cover" />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-xl sticky top-24 border">
            <div className="mb-6">
              <span className="text-gray-500 block">Total Price per Person</span>
              <span className="text-3xl font-bold text-primary">₹{tour.price.toLocaleString()}</span>
            </div>

            <div className="space-y-4 mb-6">
              <h4 className="font-bold">Includes:</h4>
              <ul className="text-sm space-y-2">
                {tour.inclusions?.map((inc, i) => (
                   <li key={i} className="flex items-center gap-2 text-green-600"><FaCheckCircle /> {inc}</li>
                ))}
              </ul>
              <h4 className="font-bold pt-4">Excludes:</h4>
              <ul className="text-sm space-y-2">
                 {tour.exclusions?.map((exc, i) => (
                   <li key={i} className="flex items-center gap-2 text-red-500"><FaTimesCircle /> {exc}</li>
                ))}
              </ul>
            </div>

           <button 
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition"
              >
                Send Inquiry
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;