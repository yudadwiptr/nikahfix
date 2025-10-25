import React, { useEffect, useState } from 'react';

export default function MiniCountdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      const diff = Math.max(0, targetDate - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (targetDate - new Date() <= 0) return null;

  return (
    <div className="flex items-center gap-1 text-xs text-white mt-2">
      <span className="bg-[#E50913] px-2 py-1 rounded font-bold">{timeLeft.days}d</span>
      <span className="bg-[#222] px-2 py-1 rounded">{timeLeft.hours}h</span>
      <span className="bg-[#222] px-2 py-1 rounded">{timeLeft.minutes}m</span>
      <span className="bg-[#222] px-2 py-1 rounded">{timeLeft.seconds}s</span>
      <span className="ml-1"></span>
    </div>
  );
}
