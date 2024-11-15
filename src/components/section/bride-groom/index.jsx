import React from 'react';

export default function Bridegroom() {
  return (
    <div>
      <h2 className="text-lg leading-5 text-white font-bold mb-4">
        Bride and Groom
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <img
            src="images/dummy.png"
            className="w-full rounded-md"
            height={164}
          />
          <div>
            <h4 className="text-sm text-white font-medium mt-2">Aku</h4>
            <p className="text-[#A3A1A1] text-xs leading-4 mt-2">
              Putri dari Ini &amp; Ibu Itu
            </p>
          </div>
        </div>
        <div>
          <img
            src="images/dummy.png"
            className="w-full rounded-md"
            height={164}
          />
          <div>
            <h4 className="text-sm text-white font-medium mt-2">Kamu</h4>
            <p className="text-[#A3A1A1] text-xs leading-4 mt-2">
              Putri dari Ini &amp; Ibu Itu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
