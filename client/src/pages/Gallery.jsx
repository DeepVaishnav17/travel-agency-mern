import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import SEO from '../components/SEO';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        if (activeCategory === 'All') {
            setFilteredImages(images);
        } else {
            setFilteredImages(images.filter(img => img.category === activeCategory));
        }
    }, [activeCategory, images]);

    const fetchImages = async () => {
        try {
            const { data } = await api.get('/gallery');
            setImages(data);
            setFilteredImages(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching gallery images", error);
            setLoading(false);
        }
    };

    const categories = ['All', 'Tours', 'Nature', 'Happy Faces', 'Events'];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 100, damping: 20 }
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-purple-200 selection:text-primary pt-20">
            <SEO
                title="Gallery"
                description="View vivid snapshots of our happy travelers and beautiful destinations. Get inspired for your next trip."
                keywords="travel gallery, tour photos, happy travelers, destination images"
                url="/gallery"
            />


            {/* STICKY INTERNAL NAVBAR */
            /* Removed large header text per user request */}

            {/* STICKY INTERNAL NAVBAR REMOVED */}

            {/* MAIN GALLERY GRID */}
            <div className="container mx-auto px-4 pb-24">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredImages.map((image) => (
                                <motion.div
                                    key={image._id}
                                    variants={itemVariants}
                                    layoutId={image._id}
                                    className="break-inside-avoid relative rounded-xl overflow-hidden cursor-zoom-in shadow-sm hover:shadow-xl transition-shadow duration-500"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <motion.img
                                        src={image.imageUrl}
                                        alt={image.title || 'Gallery Image'}
                                        className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105 will-change-transform"
                                        loading="lazy"
                                    />
                                    {/* Pure visual focus - NO OVERLAYS */}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

                {!loading && filteredImages.length === 0 && (
                    <div className="text-center py-24 text-gray-400">
                        <p className="text-xl font-light">No moments captured in this category yet.</p>
                        <button onClick={() => setActiveCategory('All')} className="mt-4 text-primary hover:underline font-bold">See All Photos</button>
                    </div>
                )}
            </div>

            {/* IMMERSIVE LIGHTBOX */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 backdrop-blur-xl p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors p-3 rounded-full hover:bg-gray-100"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FaTimes size={28} />
                        </button>

                        <motion.div
                            layoutId={selectedImage._id}
                            className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.img
                                src={selectedImage.imageUrl}
                                alt={selectedImage.title}
                                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded shadow-2xl"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            />

                            {/* Minimal Caption if needed, strictly separated */}
                            {/* {selectedImage.title && (
                                <p className="mt-6 text-gray-500 font-medium tracking-wide text-sm uppercase">{selectedImage.title}</p>
                            )} */}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
