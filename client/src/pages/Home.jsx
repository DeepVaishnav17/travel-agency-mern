import { useEffect, useState } from 'react';
import api from '../utils/api';
import TourCard from '../components/TourCard';
import { Link } from 'react-router-dom';
import Testimonials from '../components/Testimonials';
import WhyChooseUs from '../components/WhyChooseUs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Home = () => {
  const [tours, setTours] = useState([]);
  const [config, setConfig] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tourRes = await api.get('/tours');
        const configRes = await api.get('/config');

        // Filter out Archived tours
        const activeTours = tourRes.data.filter(tour => !tour.isArchived);

        setTours(activeTours);
        setConfig(configRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Responsive Items Per Page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };

    // Set initial
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto Slide Logic
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 Seconds
    return () => clearInterval(interval);
  }, [currentSlide, tours.length, itemsPerPage]);

  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // --- HERO SLIDER CONFIGURATION ---
  // ✅ ADD MORE IMAGES HERE
  const heroImages = [
    {
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
      title: 'Explore the World',
      subtitle: 'Unforgettable journeys await you.'
    },
    {
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop', // Paris
      title: 'Romance in Paris',
      subtitle: 'Discover the city of love and lights.'
    },
    {
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop', // Venice
      title: 'Venetian Dreams',
      subtitle: 'Experience the magic of the canals.'
    },
    {
      image: '/image2.png', // Santorini
      title: 'Santorini Sunsets',
      subtitle: 'Breathtaking views of the Aegean Sea.',
      hideContent: true
    }
  ];

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  // Auto-slide for Hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* Hero Section (Slider) */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        {heroImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            {/* Image */}
            {!slide.hideContent && <div className="absolute inset-0 bg-black/40 z-10"></div>}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover absolute inset-0"
              // optimization: prioritize first image
              fetchPriority={index === 0 ? "high" : "low"}
              loading={index === 0 ? "eager" : "lazy"}
            />

            {/* Content */}
            {!slide.hideContent && (
              <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg transform transition duration-700 translate-y-0">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl font-light">{slide.subtitle}</p>
              </div>
            )}
          </div>
        ))}

        {/* Hero Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeroSlide(idx)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${currentHeroSlide === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </div>

      {/* Featured Tours Carousel Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Popular Destinations</h2>
          <p className="text-gray-500 mt-2">Our most loved tour packages</p>
        </div>

        {tours.length > 0 ? (
          <div className="relative group">
            {/* Carousel Track Wrapper */}
            <div className="overflow-hidden rounded-xl py-4"> {/* Added py-4 to show shadows */}
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Render Pages */}
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <div key={pageIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-1">
                    {tours.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map(tour => (
                      <TourCard key={tour._id} tour={tour} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons (Visible on hover or mobile) */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 backdrop-blur-sm transition opacity-0 group-hover:opacity-100 -ml-4"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg z-10 backdrop-blur-sm transition opacity-0 group-hover:opacity-100 -mr-4"
            >
              <FaChevronRight size={20} />
            </button>

            {/* Dots Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-primary w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'}`}
                />
              ))}
            </div>

          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            <p>No active tours available right now.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link to="/tours" className="inline-block border-2 border-primary text-primary px-8 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition">
            View All Tours
          </Link>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      <Testimonials />
    </div>
  );
};

export default Home;