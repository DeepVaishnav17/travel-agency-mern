import { useState, useEffect } from 'react';

const HeroSection = () => {
    // --- HERO SLIDER CONFIGURATION ---
    const heroImages = [
        {
            image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
            title: 'Explore the World',
            subtitle: 'Unforgettable journeys await you.'
        },
        {
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop', // Paris
            title: 'Romance in Paris',
            subtitle: 'Discover the city of love and lights.'
        },
        {
            image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop', // Venice
            title: 'Venetian Dreams',
            subtitle: 'Experience the magic of the canals.'
        },
        {
            image: '/image2.png', // Santorini
            title: 'Santorini Sunsets',
            subtitle: 'Breathtaking views of the Aegean Sea.',
            hideContent: true
        }
    ];

    const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

    // Auto-slide for Hero
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[80vh] w-full overflow-hidden mb-12">
            {heroImages.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    {/* Image */}
                    {!slide.hideContent && <div className="absolute inset-0 bg-black/40 z-10"></div>}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover absolute inset-0"
                        fetchPriority={index === 0 ? "high" : "low"}
                        loading={index === 0 ? "eager" : "lazy"}
                    />

                    {/* Content */}
                    {!slide.hideContent && (
                        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
                            <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg transform transition duration-700 translate-y-0">{slide.title}</h1>
                            <p className="text-xl md:text-2xl mb-8 max-w-2xl font-light">{slide.subtitle}</p>
                        </div>
                    )}
                </div>
            ))}

            {/* Hero Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
                {heroImages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentHeroSlide(idx)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${currentHeroSlide === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
