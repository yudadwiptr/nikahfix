import React, { useState } from 'react';
import data from '../../../data/config.json';
import ImageViewer from '../../ui/image-viewer';

const GalleryItem = ({ src, onClick }) => (
  <div 
    className="relative overflow-hidden rounded-md group cursor-pointer"
    onClick={onClick}
  >
    <img
      src={src}
      className="w-full h-48 object-cover transform transition-all duration-500 group-hover:scale-110"
      loading="lazy"
      alt="Gallery image"
    />
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center transform rotate-45 group-hover:rotate-0 transition-transform duration-500">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-6 h-6 text-white"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
    </div>
  </div>
);

export default function OurGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <h2 className="text-lg leading-5 text-white font-bold mb-4">
        Our Gallery
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {data.gallery.map((item, index) => (
          <GalleryItem 
            key={index} 
            src={item} 
            onClick={() => setSelectedImage(item)}
          />
        ))}
      </div>
      <ImageViewer 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
}
