import { useState, useEffect } from 'react';
import TourCard from './TourCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturedTours = ({ tours }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(3);

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

    const totalPages = Math.ceil(tours.length / itemsPerPage);

    // Auto Slide Logic (only if we have pages)
    useEffect(() => {
        if (totalPages <= 1) return;
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentSlide, totalPages, itemsPerPage]);


    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800">Popular Destinations</h2>
                <p className="text-gray-500 mt-2">Our most loved tour packages</p>
            </div>

            {tours.length > 0 ? (
                <div className="relative group">
                    {/* Carousel Track Wrapper */}
                    <div className="overflow-hidden rounded-xl py-4">
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {Array.from({ length: totalPages }).map((_, pageIndex) => (
                                <div key={pageIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-1">
                                    {tours.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map(tour => (
                                        <TourCard key={tour._id} tour={tour} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    {totalPages > 1 && (
                        <>
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
                        </>
                    )}

                    {/* Dots Indicators */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-primary w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'}`}
                                />
                            ))}
                        </div>
                    )}
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
    );
};

export default FeaturedTours;
