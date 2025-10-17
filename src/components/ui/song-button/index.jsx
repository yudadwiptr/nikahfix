import React from 'react';
import data from '../../../data/config.json';

export default function SongButton() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);
  const fadeTimerRef = React.useRef(null);

  const clearFadeTimer = () => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  const fadeIn = (durationMs = 1800) => {
    if (!audioRef.current) return;
    clearFadeTimer();
    try {
      audioRef.current.volume = 0;
    } catch {}
    const steps = 18; // 100ms per step for 1.8s total
    const stepTime = Math.max(30, Math.floor(durationMs / steps));
    let current = 0;
    fadeTimerRef.current = setInterval(() => {
      if (!audioRef.current) return clearFadeTimer();
      current += 1;
      const v = Math.min(1, current / steps);
      try {
        audioRef.current.volume = v;
      } catch {}
      if (v >= 1 || audioRef.current.paused) {
        clearFadeTimer();
      }
    }, stepTime);
  };

  const fadeOut = (durationMs = 600, onDone) => {
    if (!audioRef.current) {
      if (typeof onDone === 'function') onDone();
      return;
    }
    clearFadeTimer();
    let start = 1;
    try {
      start = typeof audioRef.current.volume === 'number' ? audioRef.current.volume : 1;
    } catch {}
    const steps = Math.max(8, Math.floor(durationMs / 60));
    const stepTime = Math.max(30, Math.floor(durationMs / steps));
    let current = 0;
    fadeTimerRef.current = setInterval(() => {
      if (!audioRef.current) return clearFadeTimer();
      current += 1;
      const v = Math.max(0, start * (1 - current / steps));
      try {
        audioRef.current.volume = v;
      } catch {}
      if (v <= 0 || audioRef.current.paused) {
        clearFadeTimer();
        try { audioRef.current.volume = 0; } catch {}
        if (typeof onDone === 'function') onDone();
      }
    }, stepTime);
  };

  // Listen for a global 'guest-click' event dispatched when the Guest button is pressed.
  // When it fires, wait for the netflix intro (if present) to end, then start the main wedding song.
  React.useEffect(() => {
    function handleGuestClick() {
      // Ensure netflix sound effect plays before the wedding song.
      let netflix = document.getElementById('netflix-audio');

      const startMain = () => {
        if (!audioRef.current) return;
        // prevent duplicate playback if already playing
        if (!audioRef.current.src) audioRef.current.src = data.audio_url;
        audioRef.current.loop = true;
        audioRef.current.currentTime = 0;
        // start from volume 0 then fade-in for smooth start
        try { audioRef.current.volume = 0; } catch {}
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            fadeIn(1800);
          })
          .catch(() => {});
      };

      const startMainWithDelay = () => setTimeout(startMain, 1000); // 1s delay after netflix ends

      if (!netflix) {
        // create netflix audio if missing (desktop fallback)
        netflix = document.createElement('audio');
        netflix.id = 'netflix-audio';
        netflix.src = '/audio/netflix.mp3';
        netflix.preload = 'auto';
        document.body.appendChild(netflix);
      }

      try {
        // restart intro from beginning and play
        netflix.currentTime = 0;
        // play may fail if autoplay policy blocks it; swallow errors
        netflix.play().catch(() => {});
      } catch (err) {}

      // Prepare weddingsong audio with the user gesture: attempt a quick play and pause so
      // future .play() calls are allowed by mobile browsers. Only do this if the weddingsong
      // element exists and isn't already playing.
      try {
        if (audioRef.current) {
          // If it's already playing, no-op
          if (audioRef.current.paused) {
            // try a quick play then pause immediately
            const p = audioRef.current.play();
            if (p && p.then) {
              p.then(() => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
              }).catch(() => {
                // ignore
              });
            }
          }
        }
      } catch (err) {}

      // When netflix ends, start wedding song after 1 second. Use once:true to avoid duplicates.
      netflix.addEventListener('ended', startMainWithDelay, { once: true });
    }

    window.addEventListener('guest-click', handleGuestClick);
    return () => {
      window.removeEventListener('guest-click', handleGuestClick);
      clearFadeTimer();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      // smooth fade-out then pause
      fadeOut(600, () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setIsPlaying(false);
      });
    } else {
      // smooth resume
      try { audioRef.current.volume = 0; } catch {}
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          fadeIn(1200);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-5 right-5 ">
      {/* single hidden audio element for the wedding song; no autoplay here */}
      <audio id="weddingsong-audio" ref={audioRef} loop src={data.audio_url} className="hidden" />
      <button
        onClick={togglePlay}
        className="w-7 h-7 bg-black rounded-full flex justify-center items-center"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <svg
          className={isPlaying ? 'animate-spin' : ''}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="25"
          height="25"
          x="0"
          y="0"
          viewBox="0 0 64 64"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M40.462 23.526A11.976 11.976 0 0 0 32 20.04c-3.074 0-6.149 1.162-8.463 3.486a11.876 11.876 0 0 0-3.516 8.473c0 3.198 1.244 6.21 3.516 8.483 4.659 4.658 12.247 4.658 16.926-.02 4.669-4.669 4.669-12.258 0-16.936zm-4.39 12.545a5.74 5.74 0 0 1-8.134-.01 5.729 5.729 0 0 1 0-8.124c2.241-2.242 5.881-2.262 8.133-.01 2.242 2.252 2.242 5.902 0 8.144zm4.39-12.545A11.976 11.976 0 0 0 32 20.04c-3.074 0-6.149 1.162-8.463 3.486a11.876 11.876 0 0 0-3.516 8.473c0 3.198 1.244 6.21 3.516 8.483 4.659 4.658 12.247 4.658 16.926-.02 4.669-4.669 4.669-12.258 0-16.936zm-4.39 12.545a5.74 5.74 0 0 1-8.134-.01 5.729 5.729 0 0 1 0-8.124c2.241-2.242 5.881-2.262 8.133-.01 2.242 2.252 2.242 5.902 0 8.144zm18.55-26.695C42.128-3.118 21.87-3.128 9.367 9.376c-12.494 12.484-12.484 32.762 0 45.256 12.504 12.493 32.761 12.483 45.255 0 12.504-12.505 12.504-32.752 0-45.256zM24.267 56.123a.905.905 0 0 1-.854.606.812.812 0 0 1-.308-.051 25.75 25.75 0 0 1-9.666-6.119 25.985 25.985 0 0 1-6.119-9.635.915.915 0 0 1 .545-1.172.923.923 0 0 1 1.172.545 24.228 24.228 0 0 0 5.697 8.967 24.124 24.124 0 0 0 8.977 5.697c.484.164.73.689.556 1.162zm1.778-4.926a.924.924 0 0 1-1.172.555 20.832 20.832 0 0 1-7.722-4.905 20.899 20.899 0 0 1-4.895-7.712.92.92 0 0 1 .555-1.172.913.913 0 0 1 1.162.555 18.971 18.971 0 0 0 4.473 7.034 19.035 19.035 0 0 0 7.044 4.483c.473.165.72.689.555 1.162zm15.713-9.44a13.784 13.784 0 0 1-9.759 4.041 13.755 13.755 0 0 1-9.768-4.04c-2.612-2.592-4.042-6.068-4.042-9.76 0-3.68 1.43-7.156 4.042-9.748 5.378-5.398 14.139-5.398 19.527 0 5.378 5.378 5.378 14.13 0 19.507zm9.44-15.712a.867.867 0 0 1-.309.062.918.918 0 0 1-.864-.607 18.824 18.824 0 0 0-4.483-7.044 18.808 18.808 0 0 0-7.033-4.473.907.907 0 0 1-.546-1.172.9.9 0 0 1 1.162-.545 20.734 20.734 0 0 1 7.713 4.894c2.21 2.211 3.866 4.803 4.905 7.723a.9.9 0 0 1-.545 1.162zm4.915-1.769a.73.73 0 0 1-.298.052.904.904 0 0 1-.864-.607c-1.203-3.383-3.126-6.406-5.697-8.977a24.142 24.142 0 0 0-8.956-5.697.912.912 0 1 1 .617-1.717 25.985 25.985 0 0 1 9.635 6.118 25.75 25.75 0 0 1 6.118 9.666.897.897 0 0 1-.555 1.162zM31.999 20.04c-3.074 0-6.149 1.162-8.463 3.486a11.876 11.876 0 0 0-3.516 8.473c0 3.198 1.244 6.21 3.516 8.483 4.659 4.658 12.247 4.658 16.926-.02 4.669-4.669 4.669-12.258 0-16.936A11.976 11.976 0 0 0 32 20.04zm4.072 16.03a5.74 5.74 0 0 1-8.133-.01 5.729 5.729 0 0 1 0-8.123c2.241-2.242 5.881-2.262 8.133-.01 2.242 2.252 2.242 5.902 0 8.144zm4.391-12.544A11.976 11.976 0 0 0 32 20.04c-3.074 0-6.149 1.162-8.463 3.486a11.876 11.876 0 0 0-3.516 8.473c0 3.198 1.244 6.21 3.516 8.483 4.659 4.658 12.247 4.658 16.926-.02 4.669-4.669 4.669-12.258 0-16.936zm-4.39 12.545a5.74 5.74 0 0 1-8.134-.01 5.729 5.729 0 0 1 0-8.124c2.241-2.242 5.881-2.262 8.133-.01 2.242 2.252 2.242 5.902 0 8.144z"
              fill="#ffffff"
              opacity="1"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  );
}
