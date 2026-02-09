import { FaUserShield, FaHeadset, FaStar, FaHandshake, FaPaperPlane, FaGlobeAsia, FaPassport, FaPlane, FaHotel, FaTrain } from 'react-icons/fa';

const WhyChooseUs = () => {
    const reasons = [
        {
            icon: <FaUserShield size={32} />,
            title: 'Your Trusted Advisor',
            desc: 'We’ll answer your every question. Our experienced travel experts know how to give you this advantage.',
            color: 'bg-blue-600'
        },
        {
            icon: <FaHeadset size={32} />,
            title: 'We Love Listening',
            desc: 'Your holiday, your terms. We’ll fill in the blanks to plan the perfect trip in the blink of an eye.',
            color: 'bg-orange-500' // Changed to orange for visual interest
        },
        {
            icon: <FaStar size={32} />,
            title: 'Memorable Experiences',
            desc: 'Do everything or do nothing. Either way, your holiday will be nothing less than extraordinary.',
            color: 'bg-teal-500'
        },
        {
            icon: <FaHandshake size={32} />,
            title: 'Easy as ABC',
            desc: 'Travel smooth and stress-free. That’s how easy we make it because that’s how your holiday should be.',
            color: 'bg-indigo-500'
        },
        {
            icon: <FaPaperPlane size={32} />,
            title: 'Handcrafted Holidays',
            desc: 'We interact with our loyal customers to co-create unique experiences that will take your holiday to the next level.',
            color: 'bg-pink-500'
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
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">

                {/* Services Strip (Mini-Header) */}
                <div className="mb-16">
                    <h3 className="text-center text-2xl font-bold text-gray-700 mb-8">Our Premium Services</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {services.map((service, index) => (
                            <div key={index} className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition bg-gray-50 hover:bg-white w-40 text-center group cursor-default">
                                <div className="text-primary mb-3 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                                <span className="font-semibold text-gray-700 text-sm">{service.title}</span>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Main "Why Choose Us" Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Deep Tours and Travels?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Discover the difference of traveling with a partner who cares about your journey as much as you do.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {reasons.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            {/* Icon Circle */}
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg mb-6 transform transition duration-500 group-hover:scale-110 ${item.color}`}>
                                {item.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {item.desc}
                            </p>

                            {/* Bottom decorative line */}
                            <div className={`mt-4 w-12 h-1 rounded ${item.color.replace('bg-', 'bg-opacity-50 bg-')}`}></div>
                        </div>
                    ))}
                </div>

                {/* SEO / Bottom Text Area */}
                <div className="mt-20 text-center max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-blue-600 mb-4">Tours and Travel Agency – Deep Tours and Travels</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        “Travel is the only thing you buy that makes you richer”. We completely swear by this and believe in fulfilling travel dreams that make you invariably rich by the day. We have been selling beautiful experiences for years through our state-of-the-art designed <span className="text-blue-500 cursor-pointer hover:underline">holiday packages</span> and other essential travel services. We inspire our customers to live a rich life, full of unforgettable travel experiences.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;
