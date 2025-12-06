import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaRupeeSign } from 'react-icons/fa';

const TourCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <div className="relative h-64">
        <img 
          src={tour.mainImage} 
          alt={tour.title} 
          className="w-full h-full object-cover"
        />
        {tour.isFeatured && (
          <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide">
            Featured
          </span>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <FaMapMarkerAlt className="text-primary" /> {tour.destination}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{tour.title}</h3>
        
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <span className="flex items-center gap-1"><FaClock /> {tour.duration}</span>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <span className="text-xs text-gray-500 block">Starting from</span>
            <span className="text-lg font-bold text-primary flex items-center">
               ₹{tour.price.toLocaleString()}
            </span>
          </div>
          <Link 
            to={`/tours/${tour._id}`} 
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;