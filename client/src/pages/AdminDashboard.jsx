import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaVideo, FaCalendarDay, FaArchive, FaUndo, FaUser, FaStar } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tours');

  // Data States
  const [tours, setTours] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reviews, setReviews] = useState([]); // ✅ NEW

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const initialFormState = {
    price: '', duration: '', mainImage: null, isArchived: false, category: 'Domestic'
  };

  const [formData, setFormData] = useState(initialFormState);

  // 1. Protect Route (API Key Check)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyFromUrl = queryParams.get('key');

    if (keyFromUrl) {
      localStorage.setItem('adminKey', keyFromUrl);
      navigate('/admin', { replace: true });
      toast.success("Admin Access Granted");
    }
  }, [location, navigate]);

  const [adminKey, setAdminKey] = useState(localStorage.getItem('adminKey'));

  // 2. Data Fetching based on Tab
  useEffect(() => {
    if (!adminKey) return;
    if (activeTab === 'tours') fetchTours();
    else if (activeTab === 'messages') fetchContacts();
    else if (activeTab === 'reviews') fetchReviews();
  }, [activeTab, adminKey]);

  // If no key, show input form
  if (!adminKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Access</h2>
          <p className="mb-4 text-gray-600 text-sm text-center">Please enter the admin secret key to continue.</p>
          <form onSubmit={(e) => {
            e.preventDefault();
            const val = e.target.elements.key.value;
            if (val) {
              localStorage.setItem('adminKey', val);
              setAdminKey(val);
              window.location.reload();
            }
          }}>
            <input name="key" type="password" placeholder="Enter Secret Key" className="w-full border p-3 rounded mb-4" />
            <button type="submit" className="w-full bg-primary text-white py-3 rounded font-bold">Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

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

  // --- IMAGE UPLOAD ---
  const uploadImage = async (file) => {
    const uploadData = new FormData();
    uploadData.append('image', file);
    const { data } = await api.post('/upload', uploadData);
    return data;
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try { const url = await uploadImage(file); setFormData({ ...formData, mainImage: url }); toast.success('Image Uploaded'); } catch (err) { toast.error('Upload failed'); }
  };

  // --- MANAGE TOURS ---
  const handleEditClick = (tour) => {
    setEditingId(tour._id);
    setFormData({ ...tour });
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

      // Auto-format Duration (e.g., "5 Days / 4 Nights")
      if (finalData.duration) {
        let formatted = finalData.duration
          .replace(/\s+/g, ' ') // Remove extra spaces
          .replace(/(\d+)\s*(days?)/i, '$1 Days')
          .replace(/(\d+)\s*(nights?)/i, '$1 Nights')
          .replace(/\//g, ' / ') // Ensure spaces around slash
          .replace(/\s+/g, ' ') // Clean up again
          .trim();
        finalData.duration = formatted;
      }

      if (!finalData.mainImage) finalData.mainImage = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop";

      if (editingId) { await api.put(`/tours/${editingId}`, finalData); toast.success('Tour Updated!'); }
      else { await api.post('/tours', finalData); toast.success('Tour Created!'); }
      cancelEdit(); fetchTours();
    } catch (error) { toast.error('Failed'); }
  };

  const handleDeleteTour = async (id) => { if (window.confirm('Delete this tour?')) { await api.delete(`/tours/${id}`); fetchTours(); toast.info('Deleted'); } };

  const handleDeleteReview = async (id) => {
    if (window.confirm('Remove this review permanently?')) {
      try { await api.delete(`/reviews/${id}`); fetchReviews(); toast.success('Review Removed'); } catch (err) { toast.error('Failed'); }
    }
  };



  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* ✅ UPDATED TABS - Removed Bookings */}
      <div className="flex gap-6 border-b mb-8 overflow-x-auto bg-white p-4 rounded-lg shadow-sm">
        {['tours', 'messages', 'reviews'].map(tab => (
          <button
            key={tab}
            className={`pb-2 px-4 text-lg font-medium capitalize whitespace-nowrap transition-colors ${activeTab === tab ? 'border-b-4 border-primary text-primary font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- TAB 1: TOURS --- */}
      {activeTab === 'tours' && (
        <div>
          {!showAddForm && (
            <button onClick={() => { cancelEdit(); setShowAddForm(true); }} className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 mb-6 font-bold shadow-lg hover:bg-orange-600 transition">
              <FaPlus /> Add New Tour
            </button>
          )}

          {showAddForm && (
            <div className="bg-white p-8 rounded-xl shadow-2xl mb-12 border border-gray-100 max-w-5xl mx-auto">
              {/* Form Header */}
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h3 className="text-2xl font-bold text-gray-800">{editingId ? 'Edit Tour Package' : 'Create New Package'}</h3>
                <button onClick={cancelEdit} className="text-gray-500 hover:text-red-500 font-bold px-4 py-2 rounded hover:bg-red-50 transition">Cancel</button>
              </div>

              <form onSubmit={handleSubmitTour} className="space-y-8">

                {/* Section 1: Basic Info */}
                <section>
                  <h4 className="text-lg font-bold text-primary mb-4 uppercase tracking-wide border-l-4 border-primary pl-3">Basic Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Tour Title</label>
                      <input placeholder="e.g. Majestic Rajasthan" className="border p-3 rounded w-full focus:ring-2 focus:ring-primary outline-none" value={formData.title} required onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Duration</label>
                      <input placeholder="e.g. 5 Days / 4 Nights" className="border p-3 rounded w-full focus:ring-2 focus:ring-primary outline-none" value={formData.duration} required onChange={e => setFormData({ ...formData, duration: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Destination</label>
                      <input placeholder="e.g. Jaipur, Udaipur" className="border p-3 rounded w-full focus:ring-2 focus:ring-primary outline-none" value={formData.destination} required onChange={e => setFormData({ ...formData, destination: e.target.value })} />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹) <span className="text-xs text-gray-400 font-normal">(Optional)</span></label>
                      <input type="number" placeholder="Optional" className="border p-3 rounded w-full focus:ring-2 focus:ring-primary outline-none" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                      <select
                        className="border p-3 rounded w-full focus:ring-2 focus:ring-primary outline-none bg-white"
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="Domestic">Domestic</option>
                        <option value="International">International</option>
                      </select>
                    </div>
                  </div>
                </section>

                <hr className="border-gray-100" />

                {/* Section 2: Media & Description */}
                <section>
                  <h4 className="text-lg font-bold text-primary mb-4 uppercase tracking-wide border-l-4 border-primary pl-3">Media & Description</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-3">
                      <label className="block text-sm font-bold text-gray-700 mb-1">Main Cover Image</label>
                      <div className="border-2 border-dashed p-6 rounded bg-gray-50 text-center hover:bg-gray-100 transition cursor-pointer relative">
                        <input type="file" onChange={handleMainImageUpload} className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                        <div className="text-gray-500">
                          {formData.mainImage ? <img src={formData.mainImage} alt="Preview" className="h-32 w-full object-cover rounded mx-auto" /> : <><FaPlus className="mx-auto mb-2" /> Upload Image</>}
                        </div>
                      </div>
                    </div>
                  </div>

                </section>



                <div className="pt-6">
                  <button type="submit" className="bg-secondary hover:bg-orange-600 text-white py-4 rounded-xl font-bold w-full shadow-lg text-lg transition transform hover:scale-[1.01]">
                    {editingId ? 'Update Tour Package' : 'Create Tour Package'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tours List Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
                <tr>
                  <th className="p-4 border-b">Title</th>
                  <th className="p-4 border-b">Price</th>
                  <th className="p-4 border-b">Status</th>
                  <th className="p-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tours.map(tour => (
                  <tr key={tour._id} className={`hover:bg-gray-50 transition ${tour.isArchived ? 'bg-gray-50 opacity-60' : ''}`}>
                    <td className="p-4 font-medium text-gray-800">
                      {tour.title}
                      <span className={`text-[10px] px-2 py-1 rounded-full ml-2 uppercase tracking-wide ${tour.category === 'International' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{tour.category}</span>
                    </td>
                    <td className="p-4 font-bold text-gray-600">{tour.price ? `₹${tour.price.toLocaleString()}` : <span className="text-gray-400 italic text-xs">Not Set</span>}</td>
                    <td className="p-4"><button onClick={() => handleArchiveToggle(tour)} className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 w-fit ${tour.isArchived ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-700'}`}>{tour.isArchived ? 'Archived' : 'Active'}</button></td>
                    <td className="p-4 flex gap-3">
                      <button onClick={() => handleEditClick(tour)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded hover:bg-blue-100 transition" title="Edit"><FaEdit size={16} /></button>
                      <button onClick={() => handleDeleteTour(tour._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded hover:bg-red-100 transition" title="Delete"><FaTrash size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 3: MESSAGES (Refactored) --- */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4 border-b">Contact Info</th>
                <th className="p-4 border-b">Message</th>
                <th className="p-4 border-b hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.length > 0 ? contacts.map(c => (
                <tr key={c._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 align-top">
                    <p className="font-bold text-gray-900">{c.name}</p>
                    <a href={`mailto:${c.email}`} className="text-sm text-blue-600 hover:underline block mb-1">{c.email}</a>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${c.category === 'Suggestion' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-gray-100 text-gray-600'}`}>{c.category}</span>
                  </td>
                  <td className="p-4 align-top">
                    <p className="text-gray-700 text-sm whitespace-pre-wrap leading-relaxed">{c.message}</p>
                    <div className="md:hidden text-xs text-gray-400 mt-2">{new Date(c.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="p-4 align-top text-sm text-gray-500 hidden md:table-cell whitespace-nowrap">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              )) : <tr><td colSpan="3" className="p-10 text-center text-gray-500 italic">No messages found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {/* --- TAB 4: REVIEWS --- */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4 border-b">User</th>
                <th className="p-4 border-b">Rating</th>
                <th className="p-4 border-b">Comment</th>
                <th className="p-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.length > 0 ? reviews.map(r => (
                <tr key={r._id} className="hover:bg-gray-50 transition">
                  <td className="p-4 font-bold text-gray-800">{r.name}</td>
                  <td className="p-4"><div className="flex text-yellow-400">{[...Array(r.rating)].map((_, i) => <FaStar key={i} size={14} />)}</div></td>
                  <td className="p-4 italic text-gray-600">"{r.comment}"</td>
                  <td className="p-4">
                    <button onClick={() => handleDeleteReview(r._id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 font-bold text-xs border border-red-200 px-3 py-1.5 rounded hover:bg-red-50 transition">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              )) : <tr><td colSpan="4" className="p-10 text-center text-gray-500">No reviews found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;