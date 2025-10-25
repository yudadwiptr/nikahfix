import React, { useState } from 'react';
import TitleInfo from '../title-info';
import Bible from '../bible';
import BreakingNews from '../breaking-news';
import Bridegroom from '../bride-groom';
import CountdownTimer from '../countdown-timer';
import WeddingLocations from '../wedding-locations';
import GiftSection from '../gift';
import LoveStory from '../love-story';
import OurGallery from '../our-gallery';
import WishSection from '../wish';
import Footer from '../footer';
import data from '../../../data/config.json';
import SongButton from '../../ui/song-button';

export default function DetailInfo() {
  const videoRef = React.useRef(null);
  const [firstLoopDone, setFirstLoopDone] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [weddingsongStarted, setWeddingsongStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!videoStarted) return;
    if (!videoRef.current) return;
    // On first video ended, start weddingsong.mp3
    const handleEnded = () => {
      setFirstLoopDone(true);
      // Dispatch event so SongButton can allow weddingsong.mp3 only after video ends
      window.dispatchEvent(new Event('video-first-ended'));
      setTimeout(() => {
        if (!weddingsongStarted) {
          const weddingsong = document.getElementById('weddingsong-audio');
          if (weddingsong && weddingsong.paused) {
            weddingsong.play().catch(() => {});
            setWeddingsongStarted(true);
          }
        }
      }, 500);
    };
    videoRef.current.addEventListener('ended', handleEnded, { once: true });

    // Start video
    videoRef.current.play().catch(() => {});

    return () => {
      videoRef.current.removeEventListener('ended', handleEnded);
    };
  }, [videoStarted, weddingsongStarted]);

  return (
    <div className="space-y-5 pb-10">
      {/* Video and sore.mp3 audio are synchronized */}
      <div className="relative w-full" style={{ aspectRatio: '9/16', maxWidth: 400, margin: '0 auto' }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover rounded-xl shadow-lg"
          muted
          loop
          autoPlay
          playsInline
          style={{ display: 'block', background: '#000', borderRadius: '1rem', maxHeight: '90vh', transition: 'filter 0.3s' }}
          onLoadedData={() => setIsLoading(false)}
        >
          <source src={data.url_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

      </div>
      <div className="px-4 space-y-4">
        <TitleInfo />
        <Bible />
        {data.show_menu.breaking_news && <BreakingNews />}
        {data.show_menu.bride_and_groom && <Bridegroom />}
        {data.show_menu.love_story && <LoveStory />}
        <CountdownTimer />
        <WeddingLocations />
        {data.show_menu.gallery && (
          <OurGallery gallery={data.gallery} show_menu={data.show_menu} />
        )}
        {data.show_menu.gift && <GiftSection />}
        {data.show_menu.wish && import.meta.env.VITE_APP_TABLE_NAME ? (
          <WishSection />
        ) : null}
      </div>
      <Footer />
    </div>
  );
}
