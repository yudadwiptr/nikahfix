import React from 'react';

const GalleryItem = ({ src }) => (
  <img
    src={src}
    className="rounded-md hover:scale-105 w-full object-cover cursor-pointer"
    style={{
      minHeight: '200px',
    }}
  />
);

export default function OurGallery() {
  return (
    <div>
      <h2 className="text-lg leading-5 text-white font-bold mb-4">
        Our Gallery
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <GalleryItem src="/images/dummy.png" />
        <GalleryItem src="/images/dummy.png" />
        <GalleryItem src="/images/dummy.png" />
        <GalleryItem src="/images/dummy.png" />
        <GalleryItem src="/images/dummy.png" />
        <GalleryItem src="/images/dummy.png" />
        <GalleryItem src="/images/dummy.png" />
        <GalleryItem src="/images/dummy.png" />
        <GalleryItem src="/images/dummy.png" />
      </div>
    </div>
  );
}
