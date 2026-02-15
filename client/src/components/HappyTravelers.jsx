import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { motion } from 'framer-motion';

const HappyTravelers = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { data } = await api.get('/gallery');
                // Get latest 6 images
                setImages(data.slice(0, 6));
            } catch (error) {
                console.error("Error fetching gallery images", error);
            }
        };
        fetchImages();
    }, []);

    if (images.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
                        Happy Travelers
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        See the world through the eyes of our customers.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {images.map((image, index) => (
                        <motion.div
                            key={image._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="relative overflow-hidden rounded-lg shadow-md aspect-square cursor-pointer group"
                        >
                            <img
                                src={image.imageUrl}
                                alt="Travel moment"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/gallery"
                        className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-opacity-90 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        View Full Gallery
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HappyTravelers;
