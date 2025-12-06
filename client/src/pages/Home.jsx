import { useEffect, useState } from 'react';
import api from '../utils/api';
import TourCard from '../components/TourCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [tours, setTours] = useState([]);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tourRes = await api.get('/tours');
        const configRes = await api.get('/config');
        // Filter only featured tours or take first 3
        setTours(tourRes.data.slice(0, 3)); 
        setConfig(configRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Default banner if none exists
  const bannerImage = config?.banners?.[0]?.imageUrl || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop';
  const bannerTitle = config?.banners?.[0]?.title || 'Explore the World';
  const bannerSubtitle = config?.banners?.[0]?.subtitle || 'Unforgettable journeys await you.';

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img src={bannerImage} alt="Banner" className="w-full h-full object-cover absolute inset-0" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">{bannerTitle}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl font-light">{bannerSubtitle}</p>
          <Link to="/tours" className="bg-secondary hover:bg-orange-600 text-white px-8 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105">
            Start Your Journey
          </Link>
        </div>
      </div>

      {/* Featured Tours Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Popular Destinations</h2>
          <p className="text-gray-500 mt-2">Our most loved tour packages</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map(tour => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/tours" className="inline-block border-2 border-primary text-primary px-8 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition">
            View All Tours
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;