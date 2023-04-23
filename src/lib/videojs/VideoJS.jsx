import { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-landscape-fullscreen'
import 'videojs-seek-buttons'
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css'
import "videojs-hotkeys"
import './videojs.css'
import { useState } from 'react'
import videoPoster from '../../img/video-poster.png'

function VideoJS({ videoSource }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [options, setOptions] = useState({
    suppressNotSupportedError: true,
    autoplay: false,
    controls: true,
    responsive: true,
    preload: 'auto',
    sources: [{
      src: videoSource,
      type: 'video/mp4'
    }],
    plugins: {
      hotkeys: {
        captureDocumentHotkeys: true,
        enableModifiersForNumbers: false,
        volumeStep: 0.1,
        seekStep: 10,
      },
      landscapeFullscreen: {
        fullscreen: {
          enterOnRotate: true,
          exitOnRotate: true,
          alwaysInLandscapeMode: true,
          iOS: true
        }
      }
    },
    userActions: {
      hotkeys: {
        playPauseKey: (event) => {
          return (event.which === 32);
        },
      },
    }
  });

  useEffect(() => {
    if (playerRef) {
      const handleOrientationChange = () => {
        if (window.screen.orientation.type.includes('landscape')) {
          playerRef.current.video.videoWidth = window.screen.width;
          playerRef.current.video.videoHeight = window.screen.height;
        } else {
          playerRef.current.video.videoWidth = playerRef.current.video.videoWidth;
          playerRef.current.video.videoHeight = playerRef.current.video.videoHeight;
        }
      };

      window.screen.orientation.addEventListener('change', handleOrientationChange);

      return () => {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      };
    }
  }, [playerRef]);

  useEffect(() => {
    document.addEventListener('keydown', handleFullscreenShortcut); // Add event listener for fullscreen keyboard shortcut 

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      const player = playerRef.current = videojs(videoElement, options);

      player.preload('auto');

      player.seekButtons({
        forward: 10,
        back: 10
      })

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;
      player.src(videoSource)
      player.preload('auto');
      player.autoplay(options.autoplay);
      player.load();
    }

    return () => {
      // Remove event listener on cleanup
      document.removeEventListener('keydown', handleFullscreenShortcut);
    };

  }, [options, videoRef, videoSource])

  function handleFullscreenShortcut(event) {
    // Play/pause shortcut using spacebar
    if (event.key === ' ') {
      if (playerRef.current.paused()) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }

    // Check if player is initialized and f key is pressed
    if (playerRef.current && event.key === 'f') {
      const isFullscreen = playerRef.current.isFullscreen();
      if (isFullscreen) {
        playerRef.current.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
    }

    // Seek forward shortcut using right arrow key
    if (event.key === 'ArrowRight') {
      playerRef.current.currentTime(playerRef.current.currentTime() + 10);
    }

    // Seek backward shortcut using left arrow key
    if (event.key === 'ArrowLeft') {
      playerRef.current.currentTime(playerRef.current.currentTime() - 10);
    }
  }

  return (
    <>
      <div data-vjs-player>
        <video ref={videoRef} className='video-js vjs-big-play-centered w-[500px] lg:w-[620px] h-[180px] lg:h-[350px]' data-setup={`{"poster":"${videoPoster}"}`} />
      </div>
    </>
  )
}

export default VideoJS
