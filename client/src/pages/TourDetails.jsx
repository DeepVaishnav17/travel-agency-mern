import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import SEO from '../components/SEO';
import { FaClock, FaMapMarkerAlt, FaFilePdf, FaArrowLeft, FaStar, FaGlobe, FaPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TourDetails = () => {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const { data } = await api.get(`/tours/${id}`);
                setTour(data);
            } catch (error) {
                console.error("Error fetching tour details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTour();
    }, [id]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
    );
    if (!tour) return <div className="text-center py-20 text-xl font-bold">Tour not found.</div>;

    return (
        <div className="bg-white min-h-screen">
            <SEO
                title={tour.title}
                description={tour.desc ? tour.desc.substring(0, 160) : `Book ${tour.title} with Deep Tours & Travels.`}
                image={tour.mainImage}
                url={`/tours/${tour._id}`}
                schema={{
                    "@context": "https://schema.org",
                    "@type": "Product",
                    "name": tour.title,
                    "image": tour.mainImage,
                    "description": tour.desc,
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "INR",
                        "price": tour.price,
                        "availability": "https://schema.org/InStock"
                    }
                }}
            />

            {/* HERO SECTION */}
            <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    src={tour.mainImage}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-16 z-10 text-white">
                    <div className="container mx-auto">
                        <Link to="/tours" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold">
                            <FaArrowLeft /> Back to Tours
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-4">
                            {tour.isFeatured && (
                                <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Featured</span>
                            )}
                            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{tour.category || 'Adventure'}</span>
                        </div>

                        <h1 className="text-4xl md:text-7xl font-bold mb-4 tracking-tight leading-none text-white shadow-sm">
                            {tour.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 md:gap-10 text-lg md:text-xl font-medium text-white/90">
                            <span className="flex items-center gap-2"><FaClock className="text-primary" /> {tour.duration}</span>
                            <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-primary" /> {tour.destination}</span>
                            <span className="flex items-center gap-2 text-yellow-400"><FaStar /> 4.9 (120 Reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* INFO BAR */}
            <div className="border-b border-gray-100 bg-white sticky top-20 z-20 shadow-sm hidden md:block">
                <div className="container mx-auto px-6">
                    <div className="flex gap-8 py-4 text-sm font-bold text-gray-500 uppercase tracking-wider">
                        <a href="#overview" className="hover:text-primary transition">Overview</a>
                        <a href="#itinerary" className="hover:text-primary transition">Itinerary</a>
                        <a href="#reviews" className="hover:text-primary transition">Reviews</a>
                    </div>
                </div>
            </div>

            {/* CONTENT AREA */}
            <div className="container mx-auto px-4 py-16 grid lg:grid-cols-3 gap-16">

                {/* MAIN CONTENT (LEFT) */}
                <div className="lg:col-span-2 space-y-16">

                    {/* Overview */}
                    <div id="overview" className="prose prose-lg max-w-none text-gray-600">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <FaGlobe className="text-primary/20" /> Overview
                        </h2>
                        <p className="leading-relaxed text-lg whitespace-pre-wrap">{tour.desc || "Experience the journey of a lifetime with our carefully curated tour package. From breathtaking landscapes to cultural immersion, every moment is designed to create unforgettable memories."}</p>

                        {/* Quick Highlights Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 not-prose">
                            {[
                                { label: 'Guide', val: 'Expert Included' },
                                { label: 'Transport', val: 'AC Coach/SUV' },
                                { label: 'Stay', val: 'Premium Hotels' },
                                { label: 'Meals', val: 'Breakfast & Dinner' },
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-xl text-center border border-gray-100">
                                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">{item.label}</p>
                                    <p className="font-bold text-gray-800">{item.val}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Itinerary */}
                    {tour.timeline && tour.timeline.length > 0 && (
                        <div id="itinerary">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                <FaPlane className="text-primary/20" /> Itinerary
                            </h2>
                            <div className="space-y-0 relative border-l-2 border-primary/20 ml-4 md:ml-6 pb-4">
                                {tour.timeline.map((item, index) => (
                                    <div key={index} className="relative pl-10 md:pl-16 pb-12 group last:pb-0">
                                        {/* Dot */}
                                        <div className="absolute -left-[9px] top-0 w-5 h-5 bg-white border-4 border-primary rounded-full group-hover:scale-125 transition-transform duration-300"></div>

                                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                                            <span className="text-primary font-black text-6xl opacity-10 absolute -left-4 -top-6 select-none">{item.day}</span>
                                            <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full w-fit">Day {item.day}</span>
                                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                        </div>

                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-3 hover:shadow-md transition-shadow">
                                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* SIDEBAR (RIGHT) */}
                <div className="relative">
                    <div className="sticky top-32 space-y-8">

                        {/* Booking Card */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 text-center">
                            <div className="mb-8">
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Starting Price</p>
                                <div className="flex items-center justify-center gap-1">
                                    <span className="text-5xl font-bold text-primary">₹{tour.price ? tour.price.toLocaleString() : "TBD"}</span>
                                    <span className="text-gray-400 text-lg">/pp</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-2">*Excluding taxes & fees</p>
                            </div>

                            <div className="space-y-4">
                                <Link to="/contact" className="block w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-purple-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                    Book Now
                                </Link>

                                {tour.brochure && (
                                    <a
                                        href={tour.brochure}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-white border-2 border-primary/20 text-primary py-4 rounded-xl font-bold text-lg hover:bg-primary/5 hover:border-primary transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <FaFilePdf /> Download Brochure
                                    </a>
                                )}
                            </div>

                            <hr className="my-8 border-gray-100" />

                            <div className="text-left">
                                <h4 className="font-bold text-gray-900 mb-4">Why Book With Us?</h4>
                                <ul className="space-y-3 text-sm text-gray-500">
                                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Best Price Guarantee</li>
                                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> No Hidden Charges</li>
                                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 24/7 Premium Support</li>
                                </ul>
                            </div>
                        </div>

                        {/* Help Box */}
                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
                            <h4 className="font-bold text-blue-900 mb-2">Need Customized Trip?</h4>
                            <p className="text-blue-700/80 text-sm mb-4">We can tailor this package to your needs.</p>
                            <Link to="/contact" className="text-blue-600 font-bold hover:underline text-sm uppercase tracking-wider">Contact Expert</Link>
                        </div>

                    </div>
                </div>

            </div>
            {/* MOBILE FIXED BOTTOM BAR */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-40 md:hidden flex justify-between items-center px-6">
                <div>
                    <p className="text-xs text-gray-400 uppercase font-bold">Price</p>
                    <span className="text-2xl font-bold text-primary">₹{tour.price?.toLocaleString()}</span>
                </div>
                <Link to="/contact" className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-800 transition">
                    Book Now
                </Link>
            </div>

        </div>
    );
};

export default TourDetails;
