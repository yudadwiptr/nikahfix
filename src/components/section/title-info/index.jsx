import React from 'react';
import data from '../../../data/config.json';

export default function TitleInfo() {
  return (
    <div className="space-y-1">
      <div className="flex gap-2 items-center">
        <img src="/favicon.ico" alt="logo" width={18} height={18} />
        <span className="text-[#A3A1A1] text-xs mt-0.5 tracking-widest">
          DOCUMENTER
        </span>
      </div>
      <h2 className="text-lg leading-5 text-white font-bold">
        {data.pegantin.wanita.panggilan} &amp; {data.pegantin.pria.panggilan}:
        Countdown to Forever
      </h2>
      <div className="flex gap-1 items-center">
        <span className="text-green-500 mr-2">100% match</span>
        <span className="bg-[#4D4D4D] text-white text-xs px-1 py-0 mr-2 rounded-sm">
          SU
        </span>
        <span className="text-white mr-2">
          {data.tanggal_pernikahan.split('-')[0]}
        </span>
        <span>
          <img src="/images/4k-icon.png" width={16} height={16} alt="4k" />
        </span>
        <span>
          <img src="/images/hd-icon.png" width={16} height={16} alt="hd" />
        </span>
      </div>
      <div className="bg-[#E50913] py-1 px-2 rounded text-xs text-white font-bold w-fit">
        Coming soon on Saturday, {data.tanggal_pernikahan}
      </div>
      <div className="pt-2">
        <p className="text-white text-sm leading-[1.15rem] mb-2 whitespace-pre-line" style={{ textAlign: 'justify', textShadow: '0 2px 8px #000, 0 0px 1px #000' }}>
          {data.intro}
        </p>
      </div>
    </div>
  );
}
  <div className="space-y-1 relative">
    {/* Overlay for text contrast */}
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 100%)', zIndex: 0}}></div>
    <div className="relative z-10">
      <div className="flex gap-2 items-center">
        <img src="/favicon.ico" alt="Logo Nikahfix" width={18} height={18} />
        <span className="text-[#A3A1A1] text-xs mt-0.5 tracking-widest">
          DOCUMENTER
        </span>
      </div>
      <h2 className="text-lg leading-5 text-white font-bold">
        {data.pegantin.wanita.panggilan} &amp; {data.pegantin.pria.panggilan}:
        Countdown to Forever
      </h2>
      <div className="flex gap-1 items-center">
        <span className="text-green-500 mr-2">100% match</span>
        <span className="bg-[#4D4D4D] text-white text-xs px-1 py-0 mr-2 rounded-sm">
          SU
        </span>
        <span className="text-white mr-2">
          {data.tanggal_pernikahan.split('-')[0]}
        </span>
        <span>
          <img src="/images/4k-icon.png" width={16} height={16} alt="Ikon resolusi 4K" aria-label="4K resolution" />
        </span>
        <span>
          <img src="/images/hd-icon.png" width={16} height={16} alt="Ikon resolusi HD" aria-label="HD resolution" />
        </span>
      </div>
      <div className="bg-[#E50913] py-1 px-2 rounded text-xs text-white font-bold w-fit">
        Coming soon on Saturday, {data.tanggal_pernikahan}
      </div>
      <div className="pt-2">
        <p className="text-white text-sm leading-[1.15rem] mb-2" style={{ textAlign: 'justify', textShadow: '0 2px 8px #000, 0 0px 1px #000' }}>
          {data.intro}
        </p>
      </div>
    </div>
  </div>
