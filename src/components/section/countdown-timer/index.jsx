import React, { useState, useEffect } from 'react';
import data from '../../../data/config.json';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date(data.tanggal_pernikahan);
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }) => (
    <div className="text-center">
      <div className="bg-[#E50913] text-white text-4xl font-bold w-16 h-16 flex items-center justify-center rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-300">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs mt-2 text-[#A3A1A1] uppercase tracking-wider">{label}</div>
    </div>
  );

  return (
    <div className="mb-12">
      <h2 className="text-lg leading-5 text-white font-bold mb-6">
        Almost Time For Our Celebration
      </h2>
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 shadow-2xl">
        <div className="flex justify-center gap-4">
          <TimeBox value={timeLeft.days} label="days" />
          <TimeBox value={timeLeft.hours} label="hours" />
          <TimeBox value={timeLeft.minutes} label="minutes" />
          <TimeBox value={timeLeft.seconds} label="seconds" />
        </div>
        <div className="mt-6 text-center">
          <button 
            onClick={() => {
              const event = new Date(data.tanggal_pernikahan);
              const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Wedding of ${data.pegantin.pria.panggilan} & ${data.pegantin.wanita.panggilan}`)}&dates=${event.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${event.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`;
              window.open(calendarUrl, '_blank');
            }}
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-2 mx-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
}