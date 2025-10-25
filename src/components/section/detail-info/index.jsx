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

export default function DetailInfo({ suaravideoRef }) {
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    if (!videoRef.current) return;
    // Play sore.mp3 only when video starts (user has clicked 'See the detail')
    const handlePlay = () => {
      if (suaravideoRef && suaravideoRef.current) {
        suaravideoRef.current.currentTime = 0;
        suaravideoRef.current.play().catch(() => {});
      }
    };
    videoRef.current.addEventListener('play', handlePlay, { once: true });
    return () => {
      videoRef.current.removeEventListener('play', handlePlay);
    };
  }, [suaravideoRef]);

  return (
    <div className="space-y-5 pb-10">
  <video ref={videoRef} className="w-full" autoPlay playsInline loop>
        <source src={data.url_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
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
