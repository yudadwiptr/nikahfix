import React from 'react';

export default function ImageViewer({ image, onClose }) {
  if (!image) return null;

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full"
        onClick={handleContentClick}
      >
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors text-2xl"
        >
          ✕
        </button>
        <img 
          src={image} 
          alt="Enlarged view"
          className="w-full h-auto rounded-lg shadow-2xl animate-scaleIn max-h-[90vh] object-contain bg-black"
          onError={(e) => {
            console.error('Image failed to load:', image);
            e.target.onerror = null;
            e.target.src = '/images/dummy.png';
          }}
        />
      </div>
    </div>
  );
}