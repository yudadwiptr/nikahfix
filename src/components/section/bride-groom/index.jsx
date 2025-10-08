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
          <img
            src={data.pegantin.wanita.foto}
            className="w-full rounded-md cursor-pointer hover:scale-105 transition-transform"
            height={164}
            alt="Foto pengantin wanita"
            onClick={() => setSelectedImage(data.pegantin.wanita.foto)}
          />
          <div>
            <h4 className="text-sm text-white font-medium mt-2">
              {data.pegantin.wanita.nama}
            </h4>
            <p className="text-[#A3A1A1] text-xs leading-4 mt-2">
              Putri dari {data.pegantin.wanita.bapak} &amp; Ibu{' '}
              {data.pegantin.wanita.ibu}
            </p>
          </div>
        </div>
        <div>
          <img
            src={data.pegantin.pria.foto}
            className="w-full rounded-md cursor-pointer hover:scale-105 transition-transform"
            height={164}
            alt="Foto pengantin pria"
            onClick={() => setSelectedImage(data.pegantin.pria.foto)}
          />
          <div>
            <h4 className="text-sm text-white font-medium mt-2">
              {data.pegantin.pria.nama}
            </h4>
            <p className="text-[#A3A1A1] text-xs leading-4 mt-2">
              Putra dari {data.pegantin.pria.bapak} &amp; Ibu{' '}
              {data.pegantin.pria.ibu}
            </p>
          </div>
        </div>
      </div>
      <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
