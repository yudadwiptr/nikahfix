import React, { useState } from 'react';
import data from '../../../data/config.json';
import ImageViewer from '../../ui/image-viewer';

export default function Bridegroom() {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div>
      <h2 className="text-lg leading-5 text-white font-bold mb-4">
        Bride and Groom
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="w-full h-56 sm:h-64 rounded-md overflow-hidden">
            <img
              src={data.pegantin.wanita.foto}
              className="w-full h-full object-cover cursor-pointer hover:scale-[1.02] transition-transform"
              alt="Foto pengantin wanita"
              onClick={() => setSelectedImage(data.pegantin.wanita.foto)}
            />
          </div>
          <div>
            <h4 className="text-base text-white font-medium mt-2">
              {data.pegantin.wanita.nama}
            </h4>
            <div className="bg-[#181818] rounded-md px-3 py-2 mt-2 w-full min-h-[70px] flex flex-col justify-center" style={{minWidth: 0}}>
              <span className="text-xs text-[#D1D5DB] leading-4">
                Putri ke-1 dari :<br />
                <strong>Bapak</strong> {data.pegantin.wanita.bapak}<br />
                <strong>Ibu</strong> {data.pegantin.wanita.ibu}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full h-56 sm:h-64 rounded-md overflow-hidden">
            <img
              src={data.pegantin.pria.foto}
              className="w-full h-full object-cover cursor-pointer hover:scale-[1.02] transition-transform"
              alt="Foto pengantin pria"
              onClick={() => setSelectedImage(data.pegantin.pria.foto)}
            />
          </div>
          <div>
            <h4 className="text-base text-white font-medium mt-2">
              {data.pegantin.pria.nama}
            </h4>
            <div className="bg-[#181818] rounded-md px-3 py-2 mt-2 w-full min-h-[70px] flex flex-col justify-center" style={{minWidth: 0}}>
              <span className="text-xs text-[#D1D5DB] leading-4">
                Putra ke-1 dari :<br />
                <strong>Bapak</strong> {data.pegantin.pria.bapak}<br />
                <strong>Ibu</strong> {data.pegantin.pria.ibu}
              </span>
            </div>
          </div>
        </div>
      </div>
      <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
