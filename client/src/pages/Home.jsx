import { useEffect, useState } from 'react';
import api from '../utils/api';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import FeaturedTours from '../components/FeaturedTours';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import HappyTravelers from '../components/HappyTravelers';

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

  // Fallback for tours with no category (legacy data)
  const domesticTours = tours.filter(t => !t.category || t.category === 'Domestic');
  const internationalTours = tours.filter(t => t.category === 'International');

  // Featured Tours Logic
  const featuredTours = tours.filter(t => t.isFeatured);
  const toursToShow = featuredTours.length > 0 ? featuredTours : tours.slice(0, 6);

  // Default Layout with Featured Section
  const defaultLayout = [
    { id: 'hero', label: 'Hero Section', isVisible: true, order: 1 },
    { id: 'featured', label: 'Featured Tours', isVisible: false, order: 2 }, // Hidden by default
    { id: 'domestic', label: 'Domestic Tours', isVisible: true, order: 3 },
    { id: 'international', label: 'International Tours', isVisible: true, order: 4 },
    { id: 'testimonials', label: 'Testimonials', isVisible: true, order: 5 }, // Moved up
    { id: 'whyChooseUs', label: 'Why Choose Us', isVisible: true, order: 6 },
    { id: 'happyTravelers', label: 'Happy Travelers', isVisible: true, order: 7 },
    { id: 'cta', label: 'Call to Action', isVisible: true, order: 8 }
  ];

  let activeLayout = config?.homeLayout?.length > 0 ? config.homeLayout : defaultLayout;

  // SAFETY MERGE: Ensure new sections (Domestic, International, Featured) appear even if config is old
  const existingIds = new Set(activeLayout.map(item => item.id));
  const missingSections = defaultLayout.filter(item => !existingIds.has(item.id));

  if (missingSections.length > 0) {
    // Append missing sections. We keep their default 'order' which might overlap, but they will render.
    activeLayout = [...activeLayout, ...missingSections];
  }

  const sortedLayout = [...activeLayout].sort((a, b) => a.order - b.order);

  // Background colors for separation
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
        return <div key={section.id} className="bg-white"><HeroSection /></div>;
      case 'featured':
        // Only show if we have tours
        if (toursToShow.length === 0) return null;
        return <Wrapper key={section.id}><FeaturedTours tours={toursToShow} title="Featured Tours" subtitle="Handpicked experiences just for you" /></Wrapper>;
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
      case 'happyTravelers':
        return <Wrapper key={section.id}><HappyTravelers /></Wrapper>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <SEO
        title="Home"
        description="Discover the best tour packages with Deep Tours & Travels. Domestic and international holidays curated for you."
        keywords="travel agency, tour packages, holiday packages, deep tours, travel"
        schema={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "Deep Tours & Travels",
          "image": "https://deeptourstravels.com/logo.png",
          "uRL": "https://deeptourstravels.com",
          "telephone": "+919979120728",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Radheshyam Complex, Madhav Darshan",
            "addressLocality": "Bhavnagar",
            "addressRegion": "Gujarat",
            "postalCode": "364001",
            "addressCountry": "IN"
          }
        }}
      />
      {sortedLayout.map((section, index) => renderSection(section, index))}
    </div>
  );
};

export default Home;