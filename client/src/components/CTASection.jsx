import { Link } from 'react-router-dom';

const CTASection = () => {
    return (
        <div className="bg-primary/5 py-24 text-center px-6">
            <p className="text-sm uppercase tracking-widest mb-4 opacity-50 text-secondary font-bold">START YOUR JOURNEY</p>
            <h2 className="text-3xl md:text-5xl font-medium max-w-4xl mx-auto leading-tight mb-8 text-gray-800">
                Ready to explore the world with us?
            </h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
                Book your dream vacation today and create memories that last a lifetime.
            </p>
            <Link to="/contact" className="inline-block bg-secondary text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:bg-orange-600 hover:scale-105 transition-all duration-300">
                Contact Us Now
            </Link>
        </div>
    );
};

export default CTASection;
