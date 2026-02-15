import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPlus, FaTrash, FaEdit, FaBoxOpen, FaStar, FaArrowUp, FaArrowDown, FaEye, FaEyeSlash, FaImages, FaEnvelope, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import GalleryManager from '../components/GalleryManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tours');
  const [adminKey, setAdminKey] = useState(localStorage.getItem('adminKey'));

  // Data States
  const [tours, setTours] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [homeLayout, setHomeLayout] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const initialFormState = {
    title: '', destination: '', price: '', duration: '', desc: '', mainImage: null, isArchived: false, category: 'Domestic', brochure: null
  };
  const [formData, setFormData] = useState(initialFormState);

  // 1. Protect Route (API Key Check)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyFromUrl = queryParams.get('key');

    if (keyFromUrl) {
      localStorage.setItem('adminKey', keyFromUrl);
      setAdminKey(keyFromUrl); // Update state immediately
      navigate('/admin', { replace: true });
      toast.success("Admin Access Granted");
    }
  }, [location, navigate]);

  // 2. Data Fetching based on Tab
  useEffect(() => {
    if (!adminKey) return;
    if (activeTab === 'tours') fetchTours();
    else if (activeTab === 'messages') fetchContacts();
    else if (activeTab === 'reviews') fetchReviews();
    else if (activeTab === 'layout') fetchLayout();
    else if (activeTab === 'gallery') fetchGallery();
  }, [activeTab, adminKey]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('adminKey');
    setAdminKey(null);
    toast.info("Logged Out");
  };


  // --- API CALLS ---
  const fetchTours = async () => {
    try {
      const { data } = await api.get('/tours');
      setTours(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load tours");
    }
  };
  const fetchContacts = async () => { try { const { data } = await api.get('/contact'); setContacts(Array.isArray(data) ? data : []); } catch (error) { console.error("Error"); } };
  const fetchReviews = async () => { try { const { data } = await api.get('/reviews'); setReviews(Array.isArray(data) ? data : []); } catch (error) { console.error("Error"); } };
  const fetchGallery = async () => { try { const { data } = await api.get('/gallery'); setGalleryImages(data); } catch (error) { console.error("Error"); } };

  const fetchLayout = async () => {
    try {
      const { data } = await api.get('/config');
      if (data.homeLayout && data.homeLayout.length > 0) {
        setHomeLayout(data.homeLayout.sort((a, b) => a.order - b.order));
      } else {
        setHomeLayout([
          { id: 'hero', label: 'Hero Section', isVisible: true, order: 1 },
          { id: 'featured', label: 'Featured Tours', isVisible: true, order: 2 },
          { id: 'whyChooseUs', label: 'Why Choose Us', isVisible: true, order: 3 },
          { id: 'testimonials', label: 'Testimonials', isVisible: true, order: 4 },
          { id: 'cta', label: 'Call to Action', isVisible: true, order: 5 }
        ]);
      }
    } catch (error) { console.error("Error"); }
  };

  const saveLayout = async (updatedLayout) => {
    try {
      await api.put('/config', { homeLayout: updatedLayout });
      setHomeLayout(updatedLayout);
      toast.success("Layout Updated!");
    } catch (error) { toast.error("Failed to save layout"); }
  };

  // --- LAYOUT ACTIONS ---
  const moveSection = (index, direction) => {
    const newLayout = [...homeLayout];
    if (direction === 'up' && index > 0) {
      [newLayout[index], newLayout[index - 1]] = [newLayout[index - 1], newLayout[index]];
    } else if (direction === 'down' && index < newLayout.length - 1) {
      [newLayout[index], newLayout[index + 1]] = [newLayout[index + 1], newLayout[index]];
    }
    const orderedLayout = newLayout.map((item, idx) => ({ ...item, order: idx + 1 }));
    saveLayout(orderedLayout);
  };

  const toggleVisibility = (id) => {
    const newLayout = homeLayout.map(item =>
      item.id === id ? { ...item, isVisible: !item.isVisible } : item
    );
    saveLayout(newLayout);
  };


  // --- IMAGE UPLOAD ---
  const uploadImage = async (file) => {
    const uploadData = new FormData();
    uploadData.append('image', file);

    const key = localStorage.getItem('adminKey');
    console.log("[Dashboard] Uploading with Key:", key ? '***' + key.slice(-3) : 'NULL');

    const { data } = await api.post('/upload', uploadData, {
      headers: {
        'x-admin-key': key // Explicitly add header as backup
      }
    });
    return data;
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate File Type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      toast.info("Uploading Image...");
      const url = await uploadImage(file);
      setFormData({ ...formData, mainImage: url });
      toast.success('Image Uploaded');
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error('Upload failed. Check console.');
    }
  };

  const handleBrochureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append('file', file);
    try {
      const { data } = await api.post('/upload/file', uploadData);
      setFormData({ ...formData, brochure: data });
      toast.success('Brochure Uploaded');
    } catch (err) { toast.error('Brochure upload failed'); }
  };

  // --- MANAGE TOURS ---
  const handleEditClick = (tour) => {
    setEditingId(tour._id);
    setFormData({
      ...initialFormState, // Ensure all keys exist
      ...tour,
      desc: tour.desc || '', // Fallback for optional fields
      destination: tour.destination || '',
      brochure: tour.brochure || null
    });
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArchiveToggle = async (tour) => {
    try { await api.put(`/tours/${tour._id}`, { isArchived: !tour.isArchived }); toast.success('Status Updated'); fetchTours(); } catch (error) { toast.error('Failed'); }
  };

  const cancelEdit = () => { setShowAddForm(false); setEditingId(null); setFormData(initialFormState); };

  const handleSubmitTour = async (e) => {
    e.preventDefault();
    try {
      const finalData = { ...formData };
      if (finalData.duration) {
        let formatted = finalData.duration.replace(/\s+/g, ' ').replace(/(\d+)\s*(days?)/i, '$1 Days').replace(/(\d+)\s*(nights?)/i, '$1 Nights').replace(/\//g, ' / ').replace(/\s+/g, ' ').trim();
        finalData.duration = formatted;
      }
      if (!finalData.mainImage) finalData.mainImage = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop";

      if (editingId) { await api.put(`/tours/${editingId}`, finalData); toast.success('Tour Updated!'); }
      else { await api.post('/tours', finalData); toast.success('Tour Created!'); }
      cancelEdit(); fetchTours();
    } catch (error) { toast.error('Failed'); }
  };

  const handleDeleteTour = async (id) => { if (window.confirm('Delete this tour?')) { await api.delete(`/tours/${id}`); fetchTours(); toast.info('Deleted'); } };
  const handleDeleteReview = async (id) => { if (window.confirm('Remove this review?')) { await api.delete(`/reviews/${id}`); fetchReviews(); toast.success('Removed'); } };


  // --- LOGIN SCREEN ---
  if (!adminKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop"
            alt="Admin Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/90 to-primary/90 mix-blend-multiply"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
            <p className="text-purple-200 text-sm">Restricted Access Only</p>
          </div>

          <form onSubmit={async (e) => {
            e.preventDefault();
            const val = e.target.elements.key.value;
            if (!val) return;

            try {
              // Verify key with backend
              const trimmedKey = val.trim();
              await api.post('/config/verify', {}, {
                headers: { 'x-admin-key': trimmedKey }
              });

              localStorage.setItem('adminKey', trimmedKey);
              setAdminKey(trimmedKey);
              toast.success("Login Successful");
            } catch (error) {
              console.error("Login Failed:", error);
              toast.error("Invalid Admin Key");
            }
          }}>
            <input name="key" type="password" placeholder="Enter Secret Key" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 mb-6 transition-all" />
            <button type="submit" className="w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-purple-50 transition shadow-lg">Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD UI ---
  const tabs = [
    { id: 'tours', label: 'Tours', icon: <FaBoxOpen /> },
    { id: 'messages', label: 'Messages', icon: <FaEnvelope /> },
    { id: 'reviews', label: 'Reviews', icon: <FaStar /> },
    { id: 'gallery', label: 'Gallery', icon: <FaImages /> },
    { id: 'layout', label: 'Layout', icon: <FaCogs /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

      {/* SIDEBAR */}
      <div className="bg-white w-full md:w-64 border-r border-gray-100 flex-shrink-0">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
          <button onClick={handleLogout} className="md:hidden text-gray-400"><FaSignOutAlt /></button>
        </div>
        <nav className="p-4 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-purple-200' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t border-gray-100 hidden md:block">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-500 hover:bg-red-50 transition">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{tabs.find(t => t.id === activeTab)?.label}</h2>
            {/* Mobile Logout is in Sidebar header, Desktop in Sidebar footer */}
          </div>

          {/* TAB CONTENT */}

          {/* --- TOURS --- */}
          {activeTab === 'tours' && (
            <div className="space-y-6">
              {!showAddForm && (
                <button onClick={() => { cancelEdit(); setShowAddForm(true); }} className="bg-primary text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-800 transition flex items-center gap-2 font-bold w-full md:w-auto justify-center">
                  <FaPlus /> Create New Tour
                </button>
              )}

              {showAddForm && (
                <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-fade-in-up">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">{editingId ? 'Edit Package' : 'New Package'}</h3>
                    <button onClick={cancelEdit} className="text-gray-400 hover:text-red-500 font-bold px-3 py-1 rounded transition">Cancel</button>
                  </div>

                  <form onSubmit={handleSubmitTour} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Tour Title</label>
                      <input className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none transition" value={formData.title} required onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Majestic Rajasthan" />
                    </div>

                    <div className="md:col-span-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Destination</label>
                      <input className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none transition" value={formData.destination} required onChange={e => setFormData({ ...formData, destination: e.target.value })} placeholder="e.g. Rajasthan, India" />
                    </div>

                    <div className="md:col-span-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Price (₹)</label>
                      <input type="number" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none transition" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="45000" />
                    </div>

                    <div className="md:col-span-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Duration</label>
                      <input className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none transition" value={formData.duration} required onChange={e => setFormData({ ...formData, duration: e.target.value })} placeholder="5 Days / 4 Nights" />
                    </div>

                    <div className="md:col-span-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Category</label>
                      <div className="flex gap-2 mt-1">
                        {['Domestic', 'International'].map(cat => (
                          <button type="button" key={cat} onClick={() => setFormData({ ...formData, category: cat })} className={`flex-1 py-3 rounded-lg font-bold border transition text-sm ${formData.category === cat ? 'bg-primary/10 border-primary text-primary' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Overview (Description)</label>
                      <textarea
                        className="w-full bg-gray-50 border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none transition h-32 resize-none"
                        value={formData.desc}
                        onChange={e => setFormData({ ...formData, desc: e.target.value })}
                        placeholder="Detailed tour description..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">Cover Image</label>
                      <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl bg-gray-50 text-center hover:bg-gray-100 transition relative cursor-pointer group">
                        <input type="file" onChange={handleMainImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <div className="text-gray-400 group-hover:text-primary transition">
                          {formData.mainImage ? <img src={formData.mainImage} alt="Preview" className="h-32 w-full object-cover rounded-lg mx-auto shadow-sm" /> : <div className="flex flex-col items-center"><FaImages size={24} className="mb-2" /> <span>Click to Upload</span></div>}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 block">Brochure (PDF)</label>
                      <input type="file" accept="application/pdf" onChange={handleBrochureUpload} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                      {formData.brochure && <span className="text-xs text-green-600 font-bold block mt-1">✓ PDF Attached</span>}
                    </div>

                    <div className="md:col-span-2 pt-4">
                      <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-purple-800 transition transform hover:scale-[1.01]">
                        {editingId ? 'Update Tour' : 'Create Tour'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {tours.map(tour => (
                  <div key={tour._id} className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row items-center gap-6 ${tour.isArchived ? 'opacity-60 grayscale' : ''}`}>
                    <img src={tour.mainImage} alt={tour.title} className="w-24 h-24 object-cover rounded-xl" />

                    <div className="flex-1 text-center md:text-left">
                      <h4 className="font-bold text-lg text-gray-800">{tour.title}</h4>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-1">
                        <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">{tour.category}</span>
                        <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded">{tour.duration}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-primary text-xl mb-2">{tour.price ? `₹${tour.price.toLocaleString()}` : 'N/A'}</p>
                      <div className="flex gap-2 justify-center md:justify-end">
                        <button onClick={() => handleEditClick(tour)} className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition"><FaEdit /></button>
                        <button onClick={() => handleDeleteTour(tour._id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition"><FaTrash /></button>
                        <button onClick={() => handleArchiveToggle(tour)} className={`p-2 rounded-lg transition ${tour.isArchived ? 'bg-gray-200 text-gray-600' : 'bg-green-50 text-green-600'}`}>{tour.isArchived ? 'Unarchive' : 'Archive'}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- MESSAGES --- */}
          {activeTab === 'messages' && (
            <div className="grid gap-4">
              {contacts.length > 0 ? contacts.map(c => (
                <div key={c._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition relative pl-6 border-l-4 border-l-primary">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800">{c.name}</h4>
                      <span className="text-xs text-gray-400">{c.email} • {c.phone}</span>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-3 bg-gray-50 p-4 rounded-xl text-gray-700 text-sm leading-relaxed">
                    {c.message}
                  </div>
                  <div className="mt-2 text-right">
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${c.category === 'Suggestion' ? 'text-yellow-600' : 'text-primary'}`}>{c.category}</span>
                  </div>
                </div>
              )) : <div className="text-center py-20 text-gray-400">No messages yet.</div>}
            </div>
          )}

          {/* --- REVIEWS --- */}
          {activeTab === 'reviews' && (
            <div className="grid gap-4">
              {reviews.length > 0 ? reviews.map(r => (
                <div key={r._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">{r.name} <span className="text-yellow-400 flex"><FaStar size={12} /> {r.rating}</span></h4>
                    <p className="text-gray-600 text-sm mt-1 italic">"{r.comment}"</p>
                  </div>
                  <button onClick={() => handleDeleteReview(r._id)} className="text-red-400 hover:text-red-600 p-2"><FaTrash /></button>
                </div>
              )) : <div className="text-center py-20 text-gray-400">No reviews yet.</div>}
            </div>
          )}

          {/* --- LAYOUT --- */}
          {activeTab === 'layout' && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Home Page Layout</h3>
              <div className="space-y-3">
                {homeLayout.map((section, index) => (
                  <div key={section.id} className={`flex items-center justify-between p-4 rounded-xl border transition ${section.isVisible ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-300 font-bold text-xl w-6">{index + 1}</span>
                      <span className="font-bold text-gray-700">{section.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleVisibility(section.id)} className={`p-2 rounded-lg ${section.isVisible ? 'text-green-500 bg-green-50' : 'text-gray-400 bg-gray-200'}`}>{section.isVisible ? <FaEye /> : <FaEyeSlash />}</button>
                      <div className="h-6 w-px bg-gray-200 mx-2"></div>
                      <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-2 text-gray-400 hover:text-primary disabled:opacity-30"><FaArrowUp /></button>
                      <button onClick={() => moveSection(index, 'down')} disabled={index === homeLayout.length - 1} className="p-2 text-gray-400 hover:text-primary disabled:opacity-30"><FaArrowDown /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- GALLERY --- */}
          {activeTab === 'gallery' && (
            <GalleryManager images={galleryImages} refresh={fetchGallery} api={api} toast={toast} />
          )}


        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;