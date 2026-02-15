import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaStar, FaArrowRight } from 'react-icons/fa';

const TourCard = ({ tour }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer h-full border border-gray-100/50">

      {/* Image Container with Overlay */}
      <div className="relative h-72 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 z-10"></div>
        <img
          src={tour.mainImage}
          alt={tour.title}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {tour.isFeatured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
              Featured
            </span>
          )}
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 truncate max-w-[150px]">
            {tour.category || 'Adventure'}
          </span>
        </div>

        {/* Wishlist / Like Button (Visual Only for now) */}
        {/* <button className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
          <FaRegHeart />
        </button> */}

      </div>

      {/* Content Section - Overlapping or Bottom */}
      <div className="relative -mt-16 px-6 pb-6 z-20">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-50 transform group-hover:-translate-y-2 transition-transform duration-500">

          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
              {tour.title}
            </h3>
            <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold bg-yellow-50 px-2 py-0.5 rounded-md">
              <FaStar /> <span>4.8</span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
            <div className="flex items-center gap-1">
              <FaClock className="text-primary" /> {tour.duration}
            </div>
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-primary" /> {tour.category || 'Global'}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Starting From</p>
              <p className="text-2xl font-bold text-primary">₹{tour.price?.toLocaleString()}<span className="text-sm font-normal text-gray-400">/person</span></p>
            </div>

            <Link
              to={`/tours/${tour._id}`}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-primary hover:bg-primary hover:text-white transition-all duration-300 group-hover:bg-primary group-hover:text-white shadow-sm"
            >
              <FaArrowRight />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TourCard;