import React from 'react';
import { FaPlane, FaHotel, FaCar, FaPassport, FaUmbrella, FaGlobeAmericas, FaHiking, FaShip, FaSuitcaseRolling } from 'react-icons/fa';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Services = () => {
    const services = [
        {
            icon: <FaPlane className="text-4xl text-white" />,
            title: "Flight Booking",
            description: "Seamless domestic and international flight bookings with exclusive deals.",
            color: "bg-blue-500"
        },
        {
            icon: <FaHotel className="text-4xl text-white" />,
            title: "Premium Stays",
            description: "Handpicked luxury resorts, cozy homestays, and 5-star accommodations.",
            color: "bg-purple-500"
        },
        {
            icon: <FaCar className="text-4xl text-white" />,
            title: "Transfer Services",
            description: "Chauffeur-driven luxury cars and reliable airport transfers.",
            color: "bg-orange-500"
        },
        {
            icon: <FaPassport className="text-4xl text-white" />,
            title: "Visa Assistance",
            description: "Hassle-free visa documentation and guidance for all countries.",
            color: "bg-green-500"
        },
        {
            icon: <FaUmbrella className="text-4xl text-white" />,
            title: "Travel Insurance",
            description: "Comprehensive coverage packages for a worry-free journey.",
            color: "bg-red-500"
        },
        {
            icon: <FaGlobeAmericas className="text-4xl text-white" />,
            title: "Custom Itineraries",
            description: "Tailor-made tour packages designed specificially for your preferences.",
            color: "bg-indigo-500"
        },
        {
            icon: <FaHiking className="text-4xl text-white" />,
            title: "Adventure Tours",
            description: "Thrilling trekking, camping, and adventure sports experiences.",
            color: "bg-teal-500"
        },
        {
            icon: <FaShip className="text-4xl text-white" />,
            title: "Cruise Bookings",
            description: "Experience the ocean's expanse with our exclusive cruise partners.",
            color: "bg-cyan-500"
        },
        {
            icon: <FaSuitcaseRolling className="text-4xl text-white" />,
            title: "Corporate Travel",
            description: "Efficient MICE handling and corporate retreat planning.",
            color: "bg-gray-800"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 50 }
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 pt-20">
            <SEO
                title="Our Services"
                description="From flight bookings to visa assistance, we offer a wide range of travel services to make your journey seamless."
                keywords="flight booking, hotel booking, visa assistance, travel insurance, custom tours"
                url="/services"
            />

            {/* HERO SECTION - Immersive Gradient */}
            <div className="relative py-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-900 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tight"
                    >
                        World-Class Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-purple-100 font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        We don't just book trips; we craft experiences. From the moment you dream to the moment you return, we are with you.
                    </motion.p>
                </div>
            </div>

            {/* SERVICES GRID */}
            <div className="container mx-auto px-6 py-20 -mt-12 relative z-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 group transition-all duration-300 hover:shadow-2xl"
                        >
                            <div className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed group-hover:text-gray-600">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* CTA SECTION */}
            <div className="bg-gray-50 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Plan Your Next Journey?</h2>
                    <p className="text-gray-500 mb-8 max-w-xl mx-auto">Contact our experts today and let us handle all the details while you focus on making memories.</p>
                    <a href="/contact" className="inline-block bg-primary text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-purple-800 transition transform hover:scale-105">
                        Get a Free Quote
                    </a>
                </div>
            </div>

        </div>
    );
};

export default Services;
