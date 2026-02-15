import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <div className="bg-gradient-to-r from-primary to-purple-800 py-24 text-center px-6 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4"></div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                    Your Next Adventure Awaits
                </h2>
                <p className="text-purple-100 mb-10 text-lg md:text-xl font-light">
                    Join thousands of happy travelers who have discovered the world with Deep Tours & Travels.
                </p>
                <Link to="/contact" className="inline-block bg-white text-primary px-12 py-4 rounded-full text-lg font-bold shadow-2xl hover:bg-gray-100 hover:scale-105 transition-all duration-300">
                    Start Planning
                </Link>
            </div>
        </div>
    );
};

export default CTASection;
