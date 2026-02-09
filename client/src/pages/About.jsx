import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-[#F0EFEB] text-[#4A4A4A] font-sans antialiased">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-5xl md:text-7xl font-bold text-[#2C3E50] mb-8 tracking-tighter">ABOUT US</h1>

                {/* Hero Image */}
                <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl mb-12">
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                        alt="Scenic Landscape"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Intro Text */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-medium leading-tight">
                            Deep Tours & Travels was created with a clear purpose: to make every journey comfortable, seamless, and memorable.
                        </h2>
                    </div>
                    <div>
                        <p className="text-lg opacity-80 leading-relaxed">
                            With many years of experience in the tourism industry, our team is driven by a passion for hospitality and a deep love for exploration.
                        </p>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 gap-x-16 gap-y-24 mb-24">

                    {/* Feature 1 */}
                    <div>
                        <h3 className="underline decoration-1 underline-offset-4 mb-6 text-sm uppercase tracking-wide font-semibold">What we do?</h3>
                        <p className="text-3xl md:text-4xl font-medium leading-tight">
                            We provide premium transportation with a personal touch.
                        </p>
                    </div>

                    {/* Feature 2: Vehicles */}
                    <div>
                        <h3 className="underline decoration-1 underline-offset-4 mb-6 text-sm uppercase tracking-wide font-semibold">Our Vehicles</h3>
                        <div className="mb-6">
                            <img
                                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop"
                                alt="Luxury Car"
                                className="w-full h-64 object-cover rounded-2xl"
                            />
                        </div>
                        <p className="text-lg opacity-80 mb-6 leading-relaxed">
                            Our fleet includes luxury vehicles perfect for private tours and small groups. For larger groups, our spacious minibuses deliver the same level of comfort and convenience.
                        </p>
                        <p className="text-lg opacity-80 leading-relaxed">
                            To make your trip even easier, we offer reliable transfers to and from airports and ports. Need accommodations? We can handle that too, so you can relax and focus on enjoying every moment of your travel.
                        </p>
                    </div>

                    {/* Feature 3: Accessibility */}
                    <div>
                        <h3 className="underline decoration-1 underline-offset-4 mb-6 text-sm uppercase tracking-wide font-semibold">Accessibility</h3>
                        <h4 className="text-2xl md:text-3xl font-medium mb-4">
                            At Deep Tours & Travels, inclusivity is at the heart of what we do.
                            We believe travel should be effortless and enjoyable for everyone.
                        </h4>
                        <p className="text-lg opacity-80 leading-relaxed">
                            That's why we offer wheelchair-friendly vehicles, ensuring that no traveler misses the opportunity to experience the beauty of our destinations. Your comfort and ease are always our priority.
                        </p>
                    </div>

                    {/* Feature 4: Team */}
                    <div>
                        <h3 className="underline decoration-1 underline-offset-4 mb-6 text-sm uppercase tracking-wide font-semibold">Our team</h3>
                        <p className="text-lg opacity-80 mb-6 leading-relaxed">
                            Our drivers aren't just there to get you from one place to another - they're professionals who prioritize your safety and comfort.
                        </p>
                        <p className="text-lg opacity-80 mb-8 leading-relaxed">
                            Beyond their expertise on the road, they are passionate guides with a deep knowledge of history and culture. Whether sharing local stories or helping you uncover hidden gems, they ensure every journey is as enriching as it is secure.
                        </p>
                        <Link to="/tours" className="inline-flex items-center text-lg font-medium hover:underline transition-all">
                            EXPLORE DESTINATIONS
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer / CTA Section */}
            <div className="bg-[#E6E4DD] py-24 text-center px-6">
                <p className="text-sm uppercase tracking-widest mb-4 opacity-50">WITH DEEP TOURS & TRAVELS</p>
                <h2 className="text-3xl md:text-5xl font-medium max-w-4xl mx-auto leading-tight mb-12">
                    We make every trip a harmonious blend of comfort and discovery. Start your adventure with Deep Tours & Travels - contact us now!
                </h2>
                <Link to="/contact" className="inline-block border-b border-black pb-1 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">
                    CONTACT US
                </Link>
            </div>

        </div>
    );
};

export default About;
