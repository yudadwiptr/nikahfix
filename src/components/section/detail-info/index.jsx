import React from 'react';
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
  const [firstLoopDone, setFirstLoopDone] = React.useState(false);

  React.useEffect(() => {
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
      // Fade out sore.mp3 if needed
      soreAudioRef.current.pause();
      soreAudioRef.current.currentTime = 0;
      // Start weddingsong.mp3
      setTimeout(() => {
        const weddingsong = document.getElementById('weddingsong-audio');
        if (weddingsong && weddingsong.paused) {
          weddingsong.play().catch(() => {});
        }
      }, 500); // 0.5s jeda
    };
    videoRef.current.addEventListener('ended', handleEnded, { once: true });

    return () => {
      videoRef.current.removeEventListener('play', handlePlay);
      videoRef.current.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="space-y-5 pb-10">
      {/* Video and sore.mp3 audio are synchronized */}
      <video ref={videoRef} className="w-full" autoPlay playsInline muted loop>
        <source src={data.url_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* sore.mp3 only plays for first video, then weddingsong.mp3 for subsequent loops */}
      <audio ref={soreAudioRef} src="/audio/sore.mp3" preload="auto" className="hidden" />
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
