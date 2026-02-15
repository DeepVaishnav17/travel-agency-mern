import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';

const About = () => {
    return (
        <div className="bg-white text-gray-800 font-sans antialiased pt-20">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block animate-pulse">Our Story</span>
                <h1 className="text-5xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight">
                    Beyond Travel
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
                    We don't just move people from point A to B. <br className="hidden md:block" /> We curate the moments that become your favorite memories.
                </p>
            </div>

            {/* Hero Image */}
            <div className="container mx-auto px-6 mb-24">
                <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-[2rem] relative shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                        alt="Scenic Landscape"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[3s]"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-6 mb-32">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                            Driven by passion,<br />defined by excellence.
                        </h2>
                        <p className="text-lg text-gray-500 mb-6 leading-relaxed">
                            Deep Tours & Travels was created with a clear purpose: to make every journey comfortable, seamless, and memorable. With years of experience, we've mastered the art of hospitality.
                        </p>
                        <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                            We believe that travel is the only thing you buy that makes you richer. Our team of experts is dedicated to ensuring you get the most out of every mile.
                        </p>

                        <div className="flex gap-8 border-t border-gray-100 pt-8">
                            <div>
                                <h4 className="text-4xl font-bold text-primary mb-2">5k+</h4>
                                <p className="text-gray-400 text-sm uppercase tracking-wider">Happy Travelers</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-bold text-primary mb-2">20+</h4>
                                <p className="text-gray-400 text-sm uppercase tracking-wider">Years Experience</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-bold text-primary mb-2">100%</h4>
                                <p className="text-gray-400 text-sm uppercase tracking-wider">Satisifcation</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop"
                                alt="Our Team"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative Box */}
                        <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block">
                            <p className="text-gray-900 font-serif italic text-lg">
                                "The journey of a thousand miles begins with a single step. Let us take that step with you."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features (Services) */}
            <div className="bg-gray-50 py-32 rounded-[3rem] mx-4 mb-20">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">The Deep Tours & Travels Promise</h2>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "Premium Fleet", desc: "From luxury sedans to spacious coaches, we travel in style and comfort.", icon: "🚗" },
                            { title: "Expert Guides", desc: "Passionate storytellers who know every hidden gem and local secret.", icon: "🧭" },
                            { title: "Inclusive Travel", desc: "Wheelchair-friendly options and personalized care for every traveler.", icon: "🤝" }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="text-5xl mb-6">{item.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer / CTA Section */}
            <div className="bg-primary text-white py-32 text-center px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-purple-500 rounded-full opacity-20 blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <p className="text-purple-200 uppercase tracking-widest mb-6 font-bold">Ready to take off?</p>
                    <h2 className="text-5xl md:text-7xl font-bold max-w-5xl mx-auto leading-tight mb-12">
                        Let's plan your next<br /> unforgetable adventure.
                    </h2>
                    <Link to="/contact" className="inline-block bg-white text-primary px-12 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105">
                        Start Planning Now
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default About;
