import React from 'react';
import data from '../../../data/config.json';

const LocationCard = ({ title, place, time, mapsUrl }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#181818] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 mb-4">
      <div className="p-4">
        <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
        <div className="space-y-2 text-[#A3A1A1]">
          <p className="text-sm">{place}</p>
          <p className="text-sm">Time: {time} WIB</p>
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-2 bg-[#E50913] text-white px-4 py-2 rounded mt-2 hover:bg-[#cc0812] transition-all duration-300 transform hover:scale-105 active:scale-95 group w-full sm:w-auto justify-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              View Location
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function WeddingLocations() {
  const locations = Object.values(data.locations);

  return (
    <div className="mb-12">
      <h2 className="text-lg leading-5 text-white font-bold mb-6">
        Wedding Locations
      </h2>
      <div className="space-y-4">
        {locations.map((location, index) => (
          <LocationCard
            key={index}
            title={location.title}
            place={location.place}
            time={location.time}
            mapsUrl={location.mapsUrl}
          />
        ))}
      </div>
    </div>
  );
}