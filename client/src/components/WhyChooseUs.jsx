import { FaUserShield, FaHeadset, FaStar, FaHandshake, FaPaperPlane, FaGlobeAsia, FaPassport, FaPlane, FaHotel, FaTrain } from 'react-icons/fa';

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: <FaUserShield size={28} />,
            title: 'Trusted Advisors',
            desc: 'Expert guidance for every step of your journey.',
        },
        {
            icon: <FaHeadset size={28} />,
            title: '24/7 Support',
            desc: 'We are always here to listen and help.',
        },
        {
            icon: <FaStar size={28} />,
            title: 'Premium Experience',
            desc: 'Curated specifically for luxury and comfort.',
        },
        {
            icon: <FaHandshake size={28} />,
            title: 'Hassle-Free',
            desc: 'Seamless booking and travel planning.',
        },
        {
            icon: <FaPaperPlane size={28} />,
            title: 'Tailored Trips',
            desc: 'Custom itineraries designed just for you.',
        }
    ];

    const services = [
        { icon: <FaPlane size={24} />, title: "Flight Bookings" },
        { icon: <FaHotel size={24} />, title: "Hotel Stays" },
        { icon: <FaGlobeAsia size={24} />, title: "Custom Tours" },
        { icon: <FaPassport size={24} />, title: "Visa Assistance" },
        { icon: <FaTrain size={24} />, title: "Train Booking" },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">

                {/* Services Strip */}
                <div className="mb-24">
                    <div className="flex flex-wrap justify-center gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="flex flex-col items-center justify-center p-8 border border-gray-100 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(107,33,168,0.1)] transition-all duration-300 bg-white w-48 text-center group cursor-default">
                                <div className="text-gray-400 group-hover:text-primary mb-4 transition-colors duration-300">{service.icon}</div>
                                <span className="font-bold text-gray-700 group-hover:text-primary transition-colors text-sm">{service.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Why Choose Us</span>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Redefining Travel Excellence</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
                        We don't just book trips; we craft experiences that stay with you forever.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
                    {reasons.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center group p-6 rounded-2xl hover:bg-purple-50 transition-colors duration-300">
                            {/* Icon Circle */}
                            <div className="w-16 h-16 rounded-2xl bg-purple-100 text-primary flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
                                {item.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* SEO Text */}
                <div className="mt-24 text-center max-w-4xl mx-auto border-t border-gray-100 pt-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Deep Tours & Travels</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        “Travel is the only thing you buy that makes you richer”. We believe in fulfilling travel dreams with our state-of-the-art holidays.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;
