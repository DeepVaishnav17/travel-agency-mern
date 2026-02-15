const API_URL = 'http://127.0.0.1:5000/api';
const ADMIN_KEY = 'my-secret-admin-key';

async function updateLayout() {
    const newLayout = [
        { id: 'hero', label: 'Hero Section', isVisible: true, order: 1 },
        { id: 'featured', label: 'Featured Tours', isVisible: false, order: 2 },
        { id: 'domestic', label: 'Domestic Tours', isVisible: true, order: 3 },
        { id: 'international', label: 'International Tours', isVisible: true, order: 4 },
        { id: 'testimonials', label: 'Testimonials', isVisible: true, order: 5 },
        { id: 'whyChooseUs', label: 'Why Choose Us', isVisible: true, order: 6 },
        { id: 'happyTravelers', label: 'Happy Travelers', isVisible: true, order: 7 },
        { id: 'cta', label: 'Call to Action', isVisible: true, order: 8 }
    ];

    try {
        const res = await fetch(`${API_URL}/config`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-key': ADMIN_KEY
            },
            body: JSON.stringify({ homeLayout: newLayout })
        });

        console.log('Update Status:', res.status);
        console.log('Response:', await res.text());
    } catch (e) {
        console.error('Error:', e);
    }
}
updateLayout();
