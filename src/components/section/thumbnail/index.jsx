import React, { useEffect } from 'react';
import DetailInfo from '../detail-info';
import data from '../../../data/config.json';

const TagItem = ({ title }) => {
  return (
    <li className="bg-[#4D4D4D] py-1 px-2 rounded-xl text-xs text-white">
      {title}
    </li>
  );
};

export default function Thumbnail() {
  const [isOpenDetail, setIsOpenDetail] = React.useState(false);

  useEffect(() => {
    const scrollThreshold = 1; // minimum scroll distance in pixels

    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        setIsOpenDetail(true);
      }
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      if (touch && touch.clientY < -scrollThreshold) {
        setIsOpenDetail(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  if (isOpenDetail) {
    return <DetailInfo />;
  }
  return (
    <div
      style={{
        backgroundImage: `url(${data.thumbnail_image_url})`,
      }}
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-end mb-10"
    >
      <div className="pb-10  pt-2 bg-gradient-to-b from-transparent via-black to-black">
        <div className="px-5 mb-10 space-y-2">
          <img
            src="/images/NIKAHFIX.webp"
            alt="NIKAHFIX"
            width={56}
            height={15}
          />
          <div>
            <h1 className="font-bold text-3xl leading-none">
              {data.pegantin.wanita.panggilan} & {data.pegantin.pria.panggilan}:{' '}
              <br />
              Sebelum Hari H
            </h1>
          </div>
          <div>
            <div className="flex gap-3 items-center">
              <span className="bg-[#E50913] text-xs text-white rounded-md px-2 py-1">
                Coming Soon
              </span>
              <p className="text-sm">{data.tanggal_pernikahan}</p>
            </div>
          </div>
          <div>
            <ul className="flex gap-2 items-center">
              <TagItem title="#romantic" />
              <TagItem title="#getmarried" />
              <TagItem title="#family" />
              <TagItem title="#documenter" />
            </ul>
          </div>
        </div>
        <div className="w-full text-center  ">
          <button
            onClick={() => setIsOpenDetail(true)}
            className="uppercase w-full text-xl font-semibold"
          >
            See The Detail
          </button>
          <div className="rotate-180">
            <svg
              className="w-6 h-6 mx-auto mb-2 animate-bounce "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
