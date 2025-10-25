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
  const soreAudioRef = React.useRef(null);
  const [firstLoopDone, setFirstLoopDone] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [weddingsongStarted, setWeddingsongStarted] = useState(false);

  React.useEffect(() => {
    if (!videoStarted) return;
    if (!videoRef.current || !soreAudioRef.current) return;
    // Play sore.mp3 in sync with first video play
    const handlePlay = () => {
      soreAudioRef.current.currentTime = 0;
      soreAudioRef.current.play().catch(() => {});
    };
    videoRef.current.addEventListener('play', handlePlay, { once: true });

    // On first video ended, start weddingsong.mp3 and mute sore.mp3
    const handleEnded = () => {
      setFirstLoopDone(true);
      soreAudioRef.current.pause();
      soreAudioRef.current.currentTime = 0;
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
      videoRef.current.removeEventListener('play', handlePlay);
      videoRef.current.removeEventListener('ended', handleEnded);
    };
  }, [videoStarted, weddingsongStarted]);

  return (
    <div className="space-y-5 pb-10">
      {/* Video and sore.mp3 audio are synchronized */}
      <div className="relative w-full aspect-video">
        {!videoStarted && (
          <button
            className="absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-black/70 hover:bg-black/80 transition-colors"
            onClick={() => setVideoStarted(true)}
            aria-label="Play Video"
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="32" fill="#E50913" />
              <polygon points="26,20 48,32 26,44" fill="white" />
            </svg>
          </button>
        )}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          style={{ display: videoStarted ? 'block' : 'none' }}
        >
          <source src={data.url_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* sore.mp3 only plays for first video, then weddingsong.mp3 for subsequent loops */}
        <audio ref={soreAudioRef} src="/audio/sore.mp3" preload="auto" className="hidden" />
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
