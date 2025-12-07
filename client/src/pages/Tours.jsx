import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // ✅ Import this hook
import api from '../utils/api';
import TourCard from '../components/TourCard';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get search params from URL
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search'); // Extract "goa" from "?search=goa"

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        // ✅ 1. Determine URL: If searching, send query to backend
        const url = searchQuery ? `/tours?search=${searchQuery}` : '/tours';
        
        const res = await api.get(url);

        // ✅ 2. Filter out Archived tours (Keep your existing logic)
        // Note: Even if backend returns search results, we hide archived ones here
        const activeTours = res.data.filter(tour => !tour.isArchived);
        
        setTours(activeTours);
      } catch (err) {
        console.error("Error fetching tours:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [searchQuery]); // ✅ Re-run whenever URL search changes

  return (
    <div className="container mx-auto px-4 py-12">
      
      {/* Dynamic Header */}
      <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
        {searchQuery ? `Search Results for "${searchQuery}"` : "All Tour Packages"}
      </h1>
      
      {/* ✅ UPDATED: Shows exact count of found tours */}
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        {searchQuery 
          ? `We found ${tours.length} trip(s) matching your search.` 
          : "Choose from our wide range of premium tour packages tailored for every traveler."}
      </p>

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-bold text-xl">Loading tours...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.length > 0 ? (
            tours.map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-500">
                <h3 className="text-2xl font-bold mb-2">No tours found.</h3>
                <p>
                    {searchQuery 
                        ? `We couldn't find any tours matching "${searchQuery}".` 
                        : "Please check back later for new packages!"}
                </p>
                
                {/* Show 'View All' button only if user was searching */}
                {searchQuery && (
                    <button 
                        onClick={() => window.location.href='/tours'} 
                        className="mt-6 bg-primary text-white px-6 py-2 rounded-full hover:bg-orange-600 transition"
                    >
                        View All Tours
                    </button>
                )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tours;