import React from 'react';
import data from '../../../data/config.json';

const LocationCard = ({ title, place, time, mapsUrl }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  };

  // Extract only the time portion (after '-') if the string contains a date like
  // "29 November 2025 - 08:00" -> "08:00"
  const timeOnly = (() => {
    const t = String(time || '');
    if (t.includes('-')) {
      const parts = t.split('-');
      return parts[parts.length - 1].trim();
    }
    return t.trim();
  })();

  return (
    <div className="bg-[#181818] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 mb-4">
      <div className="p-4">
        <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
        <div className="space-y-2 text-[#A3A1A1]">
          <p className="text-sm">{place}</p>
          <p className="text-sm">Time: {timeOnly} WIB</p>
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
  // Split by date for clearer grouping
  const groupByDate = (items, dateStartsWith) =>
    items.filter((loc) => (loc.time || '').startsWith(dateStartsWith));

  const nov01 = groupByDate(locations, '01 November');
  const nov29 = groupByDate(locations, '29 November');

  return (
    <div className="mb-12">
      <h2 className="text-lg leading-5 text-white font-bold mb-6">Wedding Locations</h2>

      {/* Section: 01 November */}
      {nov01.length > 0 && (
        <div className="mb-8">
          <h3 className="text-white text-base font-semibold mb-3">01 November 2025</h3>
          <div className="space-y-4">
            {nov01.map((location, index) => (
              <LocationCard
                key={`nov01-${index}`}
                title={location.title}
                place={location.place}
                time={location.time}
                mapsUrl={location.mapsUrl}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section: 29 November */}
      {nov29.length > 0 && (
        <div>
          <h3 className="text-white text-base font-semibold mb-3">29 November 2025</h3>
          <div className="space-y-4">
            {nov29.map((location, index) => (
              <LocationCard
                key={`nov29-${index}`}
                title={location.title}
                place={location.place}
                time={location.time}
                mapsUrl={location.mapsUrl}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}