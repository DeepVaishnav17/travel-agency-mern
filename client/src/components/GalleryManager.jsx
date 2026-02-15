import React, { useState } from 'react';
import { FaTrash, FaPlus, FaImage } from 'react-icons/fa';

const GalleryManager = ({ images, refresh, api, toast }) => {
    const [uploading, setUploading] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('All');

    const handleFileChange = (e) => {
        setNewImage(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!newImage) return toast.error("Please select an image");

        setUploading(true);
        const formData = new FormData();
        formData.append('image', newImage);
        formData.append('title', title);
        formData.append('category', category); // ✅ Added Category
        formData.append('isFeatured', true);

        try {
            const adminKey = localStorage.getItem('adminKey');
            await api.post('/gallery', formData, {
                headers: { 'x-admin-key': adminKey }
            });
            toast.success("Image added to gallery");
            setNewImage(null);
            setTitle('');
            setCategory('All');
            refresh();
        } catch (error) {
            toast.error("Failed to upload image");
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this image?")) return;
        try {
            await api.delete(`/gallery/${id}`);
            toast.success("Image deleted");
            refresh();
        } catch (error) {
            toast.error("Failed to delete image");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Gallery Manager</h2>

            {/* Upload Section */}
            <div className="mb-10 bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FaPlus /> Add New Photo</h3>
                <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-grow">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Photo Title (Optional)</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Happy family in Manali"
                            className="border p-3 rounded w-full focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    <div className="w-full md:w-1/4">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="border p-3 rounded w-full focus:ring-2 focus:ring-primary outline-none bg-white"
                        >
                            <option value="All">General</option>
                            <option value="Tours">Tours</option>
                            <option value="Nature">Nature</option>
                            <option value="Happy Faces">Happy Faces</option>
                            <option value="Events">Events</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Image File</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-orange-600"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={uploading}
                        className={`bg-green-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-green-700 transition ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {uploading ? 'Uploading...' : 'Upload Photo'}
                    </button>
                </form>
            </div>

            {/* Images Grid */}
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FaImage /> Current Gallery Photos ({images.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map(img => (
                    <div key={img._id} className="relative group bg-gray-100 rounded-lg overflow-hidden shadow-sm aspect-square">
                        <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                                onClick={() => handleDelete(img._id)}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg transform hover:scale-110 transition"
                                title="Delete Image"
                            >
                                <FaTrash />
                            </button>
                        </div>
                        {img.title && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 text-center truncate">
                                {img.title}
                            </div>
                        )}
                    </div>
                ))}
                {images.length === 0 && <p className="text-gray-500 italic col-span-full">No images in gallery.</p>}
            </div>
        </div>
    );
};

export default GalleryManager;
