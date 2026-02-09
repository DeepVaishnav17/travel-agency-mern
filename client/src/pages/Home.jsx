import { useEffect, useState } from 'react';
import api from '../utils/api';
import HeroSection from '../components/HeroSection';
import FeaturedTours from '../components/FeaturedTours';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';

const Home = () => {
  const [tours, setTours] = useState([]);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tourRes = await api.get('/tours');
        const configRes = await api.get('/config');

        // Filter out Archived tours
        const activeTours = tourRes.data.filter(tour => !tour.isArchived);

        setTours(activeTours);
        setConfig(configRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const domesticTours = tours.filter(t => t.category === 'Domestic');
  const internationalTours = tours.filter(t => t.category === 'International');

  // Default Layout if config is not yet loaded or doesn't have it
  const defaultLayout = [
    { id: 'hero', label: 'Hero Section', isVisible: true, order: 1 },
    { id: 'domestic', label: 'Domestic Tours', isVisible: true, order: 2 },
    { id: 'international', label: 'International Tours', isVisible: true, order: 3 },
    { id: 'whyChooseUs', label: 'Why Choose Us', isVisible: true, order: 4 },
    { id: 'testimonials', label: 'Testimonials', isVisible: true, order: 5 },
    { id: 'cta', label: 'Call to Action', isVisible: true, order: 6 }
  ];

  const layout = config?.homeLayout?.length > 0 ? config.homeLayout : defaultLayout;
  const sortedLayout = [...layout].sort((a, b) => a.order - b.order);

  // Background colors for separation
  // We can cycle through them or assign specific ones to specific components if preferred.
  // "each section should be clearly separable"
  const getSectionStyle = (index) => {
    return index % 2 === 0 ? 'bg-white' : 'bg-gray-50'; // Alternating backgrounds
  };

  const renderSection = (section, index) => {
    if (!section.isVisible) return null;

    const Wrapper = ({ children, className }) => (
      <div className={`${getSectionStyle(index)} ${className || ''} w-full`}>
        {children}
      </div>
    );

    switch (section.id) {
      case 'hero':
        // Hero usually doesn't need extra padding or bg container as it has its own
        return <div key={section.id} className="bg-white"><HeroSection /></div>;
      case 'domestic':
        return <Wrapper key={section.id}><FeaturedTours tours={domesticTours} title="Domestic Tours" subtitle="Explore the beauty of our country" /></Wrapper>;
      case 'international':
        return <Wrapper key={section.id}><FeaturedTours tours={internationalTours} title="International Tours" subtitle="Discover global destinations" /></Wrapper>;
      case 'whyChooseUs':
        return <Wrapper key={section.id}><WhyChooseUs /></Wrapper>;
      case 'testimonials':
        return <Wrapper key={section.id}><Testimonials /></Wrapper>;
      case 'cta':
        return <Wrapper key={section.id}><CTASection /></Wrapper>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full">
      {sortedLayout.map((section, index) => renderSection(section, index))}
    </div>
  );
};

export default Home;