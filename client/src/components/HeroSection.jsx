import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
    // --- HERO SLIDER CONFIGURATION ---
    const heroImages = [
        {
            image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
            title: 'Explore the Unseen',
            subtitle: 'Curated journeys for the modern wanderer.'
        },
        {
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop', // Paris
            title: 'Romance in Paris',
            subtitle: 'Experience the city of lights like never before.'
        },
        {
            image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop', // Venice
            title: 'Venetian Dreams',
            subtitle: 'Get lost in the magic of the canals.'
        },

    ];

    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

    // Auto-slide for Hero
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[85vh] w-full overflow-hidden bg-gray-900">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentHeroSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    {/* Image */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 z-10"></div>
                    <img
                        src={heroImages[currentHeroSlide].image}
                        alt={heroImages[currentHeroSlide].title}
                        className="w-full h-full object-cover"
                    />

                    {/* Content */}
                    {!heroImages[currentHeroSlide].hideContent && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-4">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="uppercase tracking-[0.3em] text-sm md:text-base mb-4 text-purple-200"
                            >
                                Premium Travel Agency
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-5xl md:text-8xl font-bold mb-6 tracking-tight"
                            >
                                {heroImages[currentHeroSlide].title}
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-lg md:text-2xl mb-10 max-w-2xl font-light text-gray-200"
                            >
                                {heroImages[currentHeroSlide].subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="flex gap-4"
                            >
                                <Link to="/tours" className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1">
                                    Explore Tours
                                </Link>
                                <Link to="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold hover:bg-white hover:text-primary transition-all shadow-lg transform hover:-translate-y-1">
                                    Plan My Trip
                                </Link>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Hero Dots */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
                {heroImages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentHeroSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${currentHeroSlide === idx ? 'bg-white w-8' : 'bg-white/30 w-2 hover:bg-white/60'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
