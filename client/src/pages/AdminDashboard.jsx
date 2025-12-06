import { useState, useEffect } from 'react';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('tours'); // 'tours', 'bookings'
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  
  // Form State for Adding Tour
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '', destination: '', price: '', duration: '', desc: '', mainImage: null
  });

  // Fetch data whenever the Active Tab changes
  useEffect(() => {
    if (activeTab === 'tours') {
        fetchTours();
    } else if (activeTab === 'bookings') {
        fetchBookings();
    }
  }, [activeTab]);

  // --- TOUR FUNCTIONS ---

  const fetchTours = async () => {
    try {
      const { data } = await api.get('/tours');
      setTours(data);
    } catch (error) {
      console.error("Failed to fetch tours");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);
    
    try {
      const { data } = await api.post('/upload', uploadData); // Returns Cloudinary URL
      setFormData({ ...formData, mainImage: data }); 
      toast.success('Image Uploaded!');
    } catch (error) {
      toast.error('Image upload failed. Check server logs.');
    }
  };

  const handleSubmitTour = async (e) => {
    e.preventDefault();
    try {
      // 1. Prepare data
      const finalData = { ...formData };
      
      // 2. Fallback Image if none uploaded
      if (!finalData.mainImage) {
        finalData.mainImage = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop";
      }

      // 3. Send to backend
      await api.post('/tours', finalData);
      
      toast.success('Tour Created Successfully!');
      setShowAddForm(false);
      
      // Reset form
      setFormData({
        title: '', destination: '', price: '', duration: '', desc: '', mainImage: null
      });
      
      fetchTours(); 
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create tour');
    }
  };

  const handleDeleteTour = async (id) => {
    if(window.confirm('Are you sure you want to delete this tour?')) {
        try {
            await api.delete(`/tours/${id}`);
            fetchTours();
            toast.info('Tour Deleted');
        } catch (error) {
            toast.error('Failed to delete tour');
        }
    }
  };

  // --- BOOKING FUNCTIONS ---

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings');
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      toast.success(`Booking marked as ${status}`);
      fetchBookings(); // Refresh list to show new status
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-8">
        <button 
          className={`pb-2 px-2 text-lg font-medium transition-colors ${activeTab === 'tours' ? 'border-b-4 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('tours')}
        >
          Manage Tours
        </button>
        <button 
          className={`pb-2 px-2 text-lg font-medium transition-colors ${activeTab === 'bookings' ? 'border-b-4 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('bookings')}
        >
          Inquiries & Bookings
        </button>
      </div>

      {/* --- TOURS TAB CONTENT --- */}
      {activeTab === 'tours' && (
        <div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mb-6 font-semibold shadow-md transition"
          >
            <FaPlus /> {showAddForm ? 'Close Form' : 'Add New Tour'}
          </button>

          {/* ADD TOUR FORM */}
          {showAddForm && (
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-700">Create New Package</h3>
              <form onSubmit={handleSubmitTour} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input placeholder="Tour Title" className="border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none" required onChange={e => setFormData({...formData, title: e.target.value})} />
                <input placeholder="Destination" className="border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none" required onChange={e => setFormData({...formData, destination: e.target.value})} />
                <input placeholder="Duration (e.g. 5 Days)" className="border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none" required onChange={e => setFormData({...formData, duration: e.target.value})} />
                <input type="number" placeholder="Price (₹)" className="border p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none" required onChange={e => setFormData({...formData, price: e.target.value})} />
                <textarea placeholder="Description" rows="3" className="border p-3 rounded-lg md:col-span-2 focus:ring-2 focus:ring-primary outline-none" required onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
                
                <div className="md:col-span-2 border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
                    <label className="block mb-2 font-semibold text-gray-600">Upload Main Image (Optional)</label>
                    <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    {formData.mainImage && <p className="text-green-600 text-sm mt-2 font-bold">Image Uploaded Successfully!</p>}
                </div>

                <button type="submit" className="bg-primary hover:bg-blue-600 text-white py-3 rounded-lg font-bold md:col-span-2 shadow-md transition">Create Tour Package</button>
              </form>
            </div>
          )}

          {/* TOUR LIST */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                <tr>
                  <th className="p-4 border-b">Title</th>
                  <th className="p-4 border-b">Price</th>
                  <th className="p-4 border-b">Destination</th>
                  <th className="p-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tours.map(tour => (
                  <tr key={tour._id} className="hover:bg-gray-50 transition border-b last:border-0">
                    <td className="p-4 font-medium text-gray-800">{tour.title}</td>
                    <td className="p-4 text-green-600 font-bold">₹{tour.price.toLocaleString()}</td>
                    <td className="p-4 text-gray-500">{tour.destination}</td>
                    <td className="p-4 flex gap-3">
                      <button className="text-blue-500 hover:text-blue-700" title="Edit"><FaEdit size={18} /></button>
                      <button onClick={() => handleDeleteTour(tour._id)} className="text-red-500 hover:text-red-700" title="Delete"><FaTrash size={18} /></button>
                    </td>
                  </tr>
                ))}
                {tours.length === 0 && (
                    <tr><td colSpan="4" className="p-8 text-center text-gray-500">No tours available. Add one above!</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- BOOKINGS TAB CONTENT --- */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
           <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm font-semibold">
                <tr>
                  <th className="p-4 border-b">Customer Info</th>
                  <th className="p-4 border-b">Tour Details</th>
                  <th className="p-4 border-b">Travel Date</th>
                  <th className="p-4 border-b">Status</th>
                  <th className="p-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition border-b last:border-0">
                    <td className="p-4">
                        <p className="font-bold text-gray-800">{booking.fullName}</p>
                        <p className="text-sm text-gray-500">{booking.email}</p>
                        <p className="text-xs text-gray-400">{booking.phone}</p>
                    </td>
                    <td className="p-4">
                        <p className="font-medium text-primary">{booking.tour?.title || 'Tour Deleted'}</p>
                        <p className="text-xs text-gray-500">Total: ₹{booking.totalPrice?.toLocaleString()}</p>
                    </td>
                    <td className="p-4">
                        <p className="font-medium">{new Date(booking.travelDate).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">{booking.travelers} Travelers</p>
                    </td>
                    <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                            booking.status === 'approved' ? 'bg-green-100 text-green-700' : 
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                            {booking.status}
                        </span>
                    </td>
                    <td className="p-4">
                      {booking.status === 'pending' ? (
                          <div className="flex gap-2">
                              <button 
                                onClick={() => handleStatusChange(booking._id, 'approved')} 
                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow text-sm flex items-center gap-1"
                                title="Approve"
                              >
                                <FaCheck /> Accept
                              </button>
                              <button 
                                onClick={() => handleStatusChange(booking._id, 'cancelled')} 
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-sm flex items-center gap-1"
                                title="Reject"
                              >
                                <FaTimes /> Reject
                              </button>
                          </div>
                      ) : (
                          <span className="text-gray-400 text-sm italic">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                    <tr><td colSpan="5" className="p-10 text-center text-gray-500 italic">No booking inquiries yet.</td></tr>
                )}
              </tbody>
            </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;