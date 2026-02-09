import React from 'react';
import { FaPlane, FaHotel, FaCar, FaPassport, FaUmbrella, FaGlobeAmericas } from 'react-icons/fa';

const Services = () => {
    const services = [
        {
            icon: <FaPlane className="text-5xl text-primary mb-4" />,
            title: "Flight Booking",
            description: "We offer competitive rates for domestic and international flights, ensuring a smooth start to your journey."
        },
        {
            icon: <FaHotel className="text-5xl text-primary mb-4" />,
            title: "Hotel Reservations",
            description: "From luxury resorts to cozy homestays, we book accommodations that fit your style and budget."
        },
        {
            icon: <FaCar className="text-5xl text-primary mb-4" />,
            title: "Car Rentals",
            description: "Explore at your own pace with our reliable car rental services, available at major destinations."
        },
        {
            icon: <FaPassport className="text-5xl text-primary mb-4" />,
            title: "Visa Assistance",
            description: "Our experts guide you through the visa application process, making international travel hassle-free."
        },
        {
            icon: <FaUmbrella className="text-5xl text-primary mb-4" />,
            title: "Travel Insurance",
            description: "Travel with peace of mind. We provide comprehensive travel insurance packages for unexpected events."
        },
        {
            icon: <FaGlobeAmericas className="text-5xl text-primary mb-4" />,
            title: "Custom Tour Packages",
            description: "Don't like pre-made plans? We create personalized itineraries tailored to your specific interests."
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-primary py-24 text-center text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-90">
                    Everything you need for a perfect trip, all in one place.
                </p>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center border border-gray-100">
                            <div className="flex justify-center">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
