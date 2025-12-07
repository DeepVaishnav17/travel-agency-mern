import { useEffect, useState } from 'react';
import api from '../utils/api';
import TourCard from '../components/TourCard';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/tours')
      .then(res => {
        // ✅ FIX: Filter out Archived tours here
        const activeTours = res.data.filter(tour => !tour.isArchived);
        
        setTours(activeTours);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">All Tour Packages</h1>
      <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
        Choose from our wide range of premium tour packages tailored for every traveler.
      </p>

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-bold">Loading tours...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.length > 0 ? (
            tours.map(tour => (
              <TourCard key={tour._id} tour={tour} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-gray-500">
                <h3 className="text-xl font-bold">No active tours found.</h3>
                <p>Please check back later for new packages!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tours;