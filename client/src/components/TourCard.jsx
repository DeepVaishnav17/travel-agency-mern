const TourCard = ({ tour }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-100 group">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.mainImage}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Featured Tag (Optional, keeping it subtle) */}
        {tour.isFeatured && (
          <div className="absolute top-0 left-0 bg-primary w-2 h-12"></div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {tour.title}
        </h3>
        <p className="text-gray-500 font-medium text-sm mb-2">{tour.duration}</p>

        {tour.price && (
          <div className="text-gray-500 text-sm mb-1">
            Starting from <span className="text-gray-800 font-bold">₹{tour.price.toLocaleString()}*</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourCard;