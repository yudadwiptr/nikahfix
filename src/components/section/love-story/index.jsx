import React, { useState } from 'react';
import data from '../../../data/config.json';
import ImageViewer from '../../ui/image-viewer';

const LoveItem = ({ imageUrl, title, duration, description, onImageClick }) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <img
            className="w-full rounded-md object-cover cursor-pointer hover:scale-105 transition-transform"
            height={100}
            style={{ maxHeight: '100px' }}
            src={imageUrl}
            alt="Foto episode love story"
            onClick={() => onImageClick(imageUrl)}
          />
        </div>
        <div className="flex justify-center">
          <div className="my-auto">
            <p className="text-white mb-2 tracking-tighter">{title}</p>
            <p className="text-xs text-[#A3A1A1]">{duration}</p>
          </div>
        </div>
      </div>
      <p className="text-[#A3A1A1] text-xs mt-2" style={{ textAlign: 'justify' }}>{description}</p>
    </div>
  );
};

export default function LoveStory() {
  const [selectedImage, setSelectedImage] = useState(null);
  // English version, hardcoded for clarity and translation accuracy
  const loveStoryEn = [
    {
      image_url: "/images/foto5.jpg",
      title: "Episode 1: December 9, 2023",
      description:
        "It all started from a simple yet meaningful introduction. We were brought together by a friend who saw something in us that we hadn't realized ourselves. From there, we began to be friends online, exchanging brief greetings on social media.",
    },
    {
      image_url: "/images/foto_6.jpg",
      title: "Episode 2: May 19, 2024",
      description:
        "Eventually, fate brought us together at a friend's wedding. That meeting became the beginning of a new story for both of us. We started spending more and more time together, sharing stories, laughter, and supporting each other amidst our busy lives. Every moment felt special, and we realized how much we enjoyed each other's company. Our bond grew stronger with every conversation, every smile, and every shared dream.",
    },
    {
      image_url: "/images/foto_7.jpg",
      title: "Episode 3: October 8, 2024",
      description:
        "Gradually, we realized that this togetherness was not a coincidence, but a beautiful plan that brought us closer. October 8, 2024, became a special day when we decided to start our journey as a couple. We made a promise to always support, respect, and love each other through every season of life. This decision marked the beginning of a new adventure, filled with hope and excitement for the future.",
    },
    {
      image_url: "/images/gl_1.jpg",
      title: "Final Episode: The Beginning of Forever",
      description:
        "Our journey hasn't always been smooth, but every challenge has made us stronger, more mature, and more certain to grow old together. Now, we are ready to step into a new chapter: making sacred vows before God and our loved ones.",
    },
  ];
  return (
    <div>
      <h2 className="text-lg leading-5 text-white font-bold mb-4">
        Our Love Story
      </h2>
      <div className="space-y-4">
        {loveStoryEn.map((item, index) => (
          <LoveItem
            key={index}
            imageUrl={item.image_url}
            title={item.title}
            duration="29m 11s "
            description={item.description}
            onImageClick={setSelectedImage}
          />
        ))}
      </div>
      <ImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
