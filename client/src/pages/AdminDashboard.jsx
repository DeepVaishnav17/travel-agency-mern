import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaVideo, FaCalendarDay, FaArchive, FaUndo, FaUser, FaStar } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tours');
  
  // Data States
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]); 
  const [users, setUsers] = useState([]);     // ✅ NEW
  const [reviews, setReviews] = useState([]); // ✅ NEW
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const initialFormState = {
    title: '', destination: '', price: '', duration: '', desc: '', mainImage: null,
    inclusions: '', exclusions: '', timeline: [], reviews: [], isArchived: false
  };

  const [formData, setFormData] = useState(initialFormState);

  // 1. Protect Route
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || userInfo.role !== 'admin') {
        toast.error("Access Denied: Admins Only");
        navigate('/'); 
    }
  }, [navigate]);

  // 2. Data Fetching based on Tab
  useEffect(() => {
    if (activeTab === 'tours') fetchTours();
    else if (activeTab === 'bookings') fetchBookings();
    else if (activeTab === 'messages') fetchContacts(); 
    else if (activeTab === 'users') fetchUsers();     // ✅ NEW
    else if (activeTab === 'reviews') fetchReviews(); // ✅ NEW
  }, [activeTab]);

  // --- API CALLS ---
  const fetchTours = async () => { try { const { data } = await api.get('/tours'); setTours(Array.isArray(data) ? data : []); } catch (error) { console.error("Error"); } };
  const fetchBookings = async () => { try { const { data } = await api.get('/bookings'); setBookings(Array.isArray(data) ? data : []); } catch (error) { console.error("Error"); } };
  const fetchContacts = async () => { try { const { data } = await api.get('/contact'); setContacts(Array.isArray(data) ? data : []); } catch (error) { console.error("Error"); } };
  
  // ✅ NEW FETCH FUNCTIONS
  const fetchUsers = async () => { try { const { data } = await api.get('/auth/users'); setUsers(Array.isArray(data) ? data : []); } catch (error) { console.error("Error"); } };
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
    setFormData({ ...tour, inclusions: tour.inclusions?.join(', '), exclusions: tour.exclusions?.join(', '), timeline: tour.timeline || [], reviews: tour.reviews || [] });
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
      if (typeof finalData.inclusions === 'string') finalData.inclusions = finalData.inclusions.split(',').map(i => i.trim());
      if (typeof finalData.exclusions === 'string') finalData.exclusions = finalData.exclusions.split(',').map(i => i.trim());
      if (!finalData.mainImage) finalData.mainImage = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop";

      if (editingId) { await api.put(`/tours/${editingId}`, finalData); toast.success('Tour Updated!'); } 
      else { await api.post('/tours', finalData); toast.success('Tour Created!'); }
      cancelEdit(); fetchTours();
    } catch (error) { toast.error('Failed'); }
  };

  const handleDeleteTour = async (id) => { if(window.confirm('Delete this tour?')) { await api.delete(`/tours/${id}`); fetchTours(); toast.info('Deleted'); } };
  const handleStatusChange = async (id, status) => { await api.put(`/bookings/${id}`, { status }); fetchBookings(); toast.success(`Marked as ${status}`); };

  // --- NEW: DELETE REVIEW ---
  const handleDeleteReview = async (id) => {
    if(window.confirm('Remove this review permanently?')) {
        try { await api.delete(`/reviews/${id}`); fetchReviews(); toast.success('Review Removed'); } catch(err) { toast.error('Failed'); }
    }
  };

  // Helper Logic for Tour Form
  const addDay = () => setFormData({...formData, timeline: [...formData.timeline, { day: formData.timeline.length + 1, title: '', desc: '', image: '' }]});
  const updateDay = (i, f, v) => { const n = [...formData.timeline]; n[i][f] = v; setFormData({...formData, timeline: n}); };
  const removeDay = (i) => { const n = formData.timeline.filter((_, idx) => idx !== i).map((item, idx) => ({...item, day: idx+1})); setFormData({...formData, timeline: n}); };
  const handleDayImageUpload = async (i, f) => { const url = await uploadImage(f); updateDay(i, 'image', url); };
  const addReview = () => setFormData({...formData, reviews: [...formData.reviews, { customerName: '', videoUrl: '' }]});
  const updateReview = (i, f, v) => { const n = [...formData.reviews]; n[i][f] = v; setFormData({...formData, reviews: n}); };
  const removeReview = (i) => { const n = formData.reviews.filter((_, idx) => idx !== i); setFormData({...formData, reviews: n}); };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* ✅ UPDATED TABS */}
      <div className="flex gap-6 border-b mb-8 overflow-x-auto">
        {['tours', 'bookings', 'messages', 'users', 'reviews'].map(tab => (
            <button 
                key={tab}
                className={`pb-2 px-2 text-lg font-medium capitalize whitespace-nowrap ${activeTab === tab ? 'border-b-4 border-primary text-primary' : 'text-gray-500'}`} 
                onClick={() => setActiveTab(tab)}
            >
                {tab}
            </button>
        ))}
      </div>

      {/* --- TAB 1: TOURS --- */}
      {activeTab === 'tours' && (
        <div>
          <button onClick={() => { cancelEdit(); setShowAddForm(!showAddForm); }} className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 mb-6 font-semibold shadow-md">
            <FaPlus /> {showAddForm ? 'Close Form' : 'Add New Tour'}
          </button>

          {showAddForm && (
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-700">{editingId ? 'Edit Tour Package' : 'Create New Package'}</h3>
                  <button onClick={cancelEdit} className="text-gray-500 hover:text-red-500 font-bold">Cancel</button>
              </div>
              <form onSubmit={handleSubmitTour} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input placeholder="Tour Title" className="border p-3 rounded" value={formData.title} required onChange={e => setFormData({...formData, title: e.target.value})} />
                    <input placeholder="Destination" className="border p-3 rounded" value={formData.destination} required onChange={e => setFormData({...formData, destination: e.target.value})} />
                    <input placeholder="Duration" className="border p-3 rounded" value={formData.duration} required onChange={e => setFormData({...formData, duration: e.target.value})} />
                    <input type="number" placeholder="Price" className="border p-3 rounded" value={formData.price} required onChange={e => setFormData({...formData, price: e.target.value})} />
                    <textarea placeholder="Description" className="border p-3 rounded md:col-span-2" value={formData.desc} required onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <textarea placeholder="Inclusions (Comma separated)" className="border p-3 rounded" value={formData.inclusions} onChange={e => setFormData({...formData, inclusions: e.target.value})}></textarea>
                    <textarea placeholder="Exclusions (Comma separated)" className="border p-3 rounded" value={formData.exclusions} onChange={e => setFormData({...formData, exclusions: e.target.value})}></textarea>
                </div>
                <div className="border-2 border-dashed p-4 rounded bg-gray-50 text-center">
                    <label className="block mb-2 font-bold">Main Cover Image</label>
                    <input type="file" onChange={handleMainImageUpload} className="block w-full text-sm mx-auto" />
                    {formData.mainImage && <img src={formData.mainImage} alt="Preview" className="h-20 mx-auto mt-2 rounded" />}
                </div>
                
                {/* ITINERARY */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2"><FaCalendarDay /> Day-wise Itinerary</h4>
                    {formData.timeline.map((day, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-2 mb-3 bg-white p-3 rounded border items-start">
                            <span className="font-bold pt-3 w-16 text-primary">Day {day.day}</span>
                            <div className="flex-1 w-full space-y-2">
                                <input placeholder="Title" className="border p-2 rounded w-full" value={day.title} onChange={(e) => updateDay(index, 'title', e.target.value)} required />
                                <textarea placeholder="Description" className="border p-2 rounded w-full" value={day.desc} onChange={(e) => updateDay(index, 'desc', e.target.value)} required />
                            </div>
                            <div className="w-full md:w-auto"><input type="file" className="text-xs" onChange={(e) => handleDayImageUpload(index, e.target.files[0])} />{day.image && <span className="text-xs text-green-600 font-bold block">Image Set ✓</span>}</div>
                            <button type="button" onClick={() => removeDay(index)} className="text-red-500 p-2"><FaTrash /></button>
                        </div>
                    ))}
                    <button type="button" onClick={addDay} className="bg-blue-100 text-blue-600 px-4 py-2 rounded font-bold text-sm hover:bg-blue-200">+ Add Day</button>
                </div>

                {/* REVIEWS */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2"><FaVideo /> Video Reviews</h4>
                    {formData.reviews.map((review, index) => (
                        <div key={index} className="flex gap-2 mb-2 bg-white p-2 rounded border items-center">
                            <input placeholder="Name" className="border p-2 rounded w-1/3" value={review.customerName} onChange={(e) => updateReview(index, 'customerName', e.target.value)} />
                            <input placeholder="YouTube Link" className="border p-2 rounded flex-1" value={review.videoUrl} onChange={(e) => updateReview(index, 'videoUrl', e.target.value)} />
                            <button type="button" onClick={() => removeReview(index)} className="text-red-500 p-2"><FaTrash /></button>
                        </div>
                    ))}
                    <button type="button" onClick={addReview} className="bg-blue-100 text-blue-600 px-4 py-2 rounded font-bold text-sm hover:bg-blue-200">+ Add Review</button>
                </div>

                <button type="submit" className="bg-primary hover:bg-blue-600 text-white py-3 rounded-lg font-bold w-full shadow-md">{editingId ? 'Update Tour Package' : 'Create Tour Package'}</button>
              </form>
            </div>
          )}

          <div className="bg-white rounded shadow overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-gray-100"><tr><th className="p-4">Title</th><th className="p-4">Price</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
                <tbody>
                    {tours.map(tour => (
                        <tr key={tour._id} className={`border-b ${tour.isArchived ? 'bg-gray-100 opacity-75' : ''}`}>
                            <td className="p-4 font-medium">{tour.title} {tour.isArchived && <span className="text-xs bg-gray-600 text-white px-2 py-0.5 rounded ml-2">Archived</span>}</td>
                            <td className="p-4">₹{tour.price}</td>
                            <td className="p-4"><button onClick={() => handleArchiveToggle(tour)} className={`text-sm font-bold flex items-center gap-1 ${tour.isArchived ? 'text-gray-500' : 'text-green-600'}`}>{tour.isArchived ? <><FaUndo /> Unarchive</> : <><FaArchive /> Archive</>}</button></td>
                            <td className="p-4 flex gap-3"><button onClick={() => handleEditClick(tour)} className="text-blue-500 hover:text-blue-700" title="Edit"><FaEdit size={18} /></button><button onClick={() => handleDeleteTour(tour._id)} className="text-red-500 hover:text-red-700" title="Delete"><FaTrash size={18} /></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 2: BOOKINGS --- */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded shadow overflow-hidden">
             <table className="w-full text-left">
              <thead className="bg-gray-100"><tr><th className="p-4">Customer</th><th className="p-4">Tour</th><th className="p-4">Status</th><th className="p-4">Actions</th></tr></thead>
              <tbody>
                {bookings.length > 0 ? bookings.map(b => (
                  <tr key={b._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{b.fullName}<br/><span className="text-xs text-gray-500">{b.email}</span></td>
                    <td className="p-4">{b.tour?.title || 'Unknown Tour'}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold uppercase ${b.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{b.status}</span></td>
                    <td className="p-4 flex gap-2">
                        {b.status === 'pending' && (<><button onClick={() => handleStatusChange(b._id, 'approved')} className="text-green-500"><FaCheck /></button><button onClick={() => handleStatusChange(b._id, 'cancelled')} className="text-red-500"><FaTimes /></button></>)}
                    </td>
                  </tr>
                )) : <tr><td colSpan="4" className="p-8 text-center text-gray-500">No bookings found.</td></tr>}
              </tbody>
            </table>
        </div>
      )}

      {/* --- TAB 3: MESSAGES --- */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded shadow overflow-hidden">
             <table className="w-full text-left">
              <thead className="bg-gray-100"><tr><th className="p-4">Name / Category</th><th className="p-4">Message</th><th className="p-4">Date</th></tr></thead>
              <tbody>
                {contacts.length > 0 ? contacts.map(c => (
                  <tr key={c._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                        <p className="font-bold text-gray-800">{c.name}</p>
                        <span className={`text-xs px-2 py-1 rounded ${c.category === 'Suggestion' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>{c.category}</span>
                        <p className="text-xs text-gray-500 mt-1">{c.email}</p>
                    </td>
                    <td className="p-4 max-w-lg">
                        <p className="text-gray-700 text-sm whitespace-pre-wrap">{c.message}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                        {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )) : <tr><td colSpan="3" className="p-10 text-center text-gray-500 italic">No messages found.</td></tr>}
              </tbody>
            </table>
        </div>
      )}

      {/* --- TAB 4: USERS (✅ NEW) --- */}
      {activeTab === 'users' && (
        <div className="bg-white rounded shadow overflow-hidden">
             <table className="w-full text-left">
              <thead className="bg-gray-100"><tr><th className="p-4">Name</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Joined On</th></tr></thead>
              <tbody>
                {users.length > 0 ? users.map(u => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-bold flex items-center gap-2"><FaUser className="text-gray-400"/> {u.name}</td>
                    <td className="p-4 text-gray-600">{u.email}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{u.role}</span></td>
                    <td className="p-4 text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                )) : <tr><td colSpan="4" className="p-10 text-center text-gray-500">No users found.</td></tr>}
              </tbody>
            </table>
        </div>
      )}

      {/* --- TAB 5: REVIEWS (✅ NEW) --- */}
      {activeTab === 'reviews' && (
        <div className="bg-white rounded shadow overflow-hidden">
             <table className="w-full text-left">
              <thead className="bg-gray-100"><tr><th className="p-4">User</th><th className="p-4">Rating</th><th className="p-4">Comment</th><th className="p-4">Action</th></tr></thead>
              <tbody>
                {reviews.length > 0 ? reviews.map(r => (
                  <tr key={r._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-bold">{r.name}</td>
                    <td className="p-4 flex text-yellow-500">{[...Array(r.rating)].map((_, i) => <FaStar key={i} size={14}/>)}</td>
                    <td className="p-4 italic text-gray-600">"{r.comment}"</td>
                    <td className="p-4">
                        <button onClick={() => handleDeleteReview(r._id)} className="text-red-500 hover:text-red-700 flex items-center gap-1 font-bold text-xs border border-red-200 px-2 py-1 rounded hover:bg-red-50">
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