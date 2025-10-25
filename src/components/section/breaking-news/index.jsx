import React, { useState } from 'react';
import data from '../../../data/config.json';
import ImageViewer from '../../ui/image-viewer';

export default function BreakingNews() {
  const [showViewer, setShowViewer] = useState(false);
  return (
    <div>
      <h2 className="font-bold mb-4">Breaking News</h2>
      <img
        className="w-full rounded-md cursor-pointer hover:scale-[1.02] transition-transform"
        height={300}
        src={data.breaking_news_img}
        alt="Breaking News"
        onClick={() => setShowViewer(true)}
      />
      <div className="text-[#A3A1A1] text-sm italic leading-[1.15rem] mt-2">
        <div
          className="space-y-2"
          dangerouslySetInnerHTML={{
            __html: data.breaking_news_content,
          }}
        ></div>
      </div>
      <ImageViewer image={showViewer ? data.breaking_news_img : null} onClose={() => setShowViewer(false)} />
    </div>
  );
}
