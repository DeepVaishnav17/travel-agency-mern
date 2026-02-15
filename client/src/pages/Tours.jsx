import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import TourCard from '../components/TourCard';
import { FaPlaneDeparture, FaSearch } from 'react-icons/fa';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const catQuery = searchParams.get('category');

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const url = searchQuery ? `/tours?search=${searchQuery}` : '/tours';
        const res = await api.get(url);

        const activeTours = res.data.filter(tour => {
          if (tour.isArchived) return false;
          // Soft check on category if URL param exists
          if (catQuery && tour.category?.toLowerCase() !== catQuery.toLowerCase()) return false;
          return true;
        });

        setTours(activeTours);
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [searchQuery, catQuery]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20"> {/* pt-20 for navbar */}

      {/* --- PAGE HEADER --- */}
      <div className="relative bg-primary text-white py-20 px-6 mb-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <pattern id="pattern-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" className="text-white" fill="currentColor"></circle>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
          </svg>
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            {searchQuery ? `Searching for "${searchQuery}"` : "Explore the World"}
          </h1>
          <p className="text-purple-200 text-lg md:text-xl max-w-2xl mx-auto font-light">
            {catQuery ? `Browsing our finest ${catQuery} packages.` : "Discover our curated list of destinations designed for unforgettable memories."}
          </p>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="container mx-auto px-6 pb-24">

        {/* Results Info */}
        {!loading && (
          <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <p className="text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-900">{tours.length}</span> {tours.length === 1 ? 'Trip' : 'Trips'}
            </p>
            {/* Optional: Add Sort dropdown here later */}
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {tours.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
                {tours.map(tour => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
                <div className="inline-block p-6 rounded-full bg-gray-100 mb-6 text-gray-400">
                  <FaSearch size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No journeys found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-8">
                  We couldn't find any tours matching your criteria. Try adjusting your search or explore our popular destinations.
                </p>
                <button
                  onClick={() => window.location.href = '/tours'}
                  className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-purple-800 transition shadow-lg"
                >
                  View All Tours
                </button>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default Tours;