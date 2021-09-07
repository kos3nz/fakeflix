import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const PlayAnimation = () => {
  const router = useRouter();
  const audioRef = useRef(null);

  const handleAudio = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  useEffect(() => {
    handleAudio();
    setTimeout(() => {
      router.push('/login');
    }, 3500);
  }, []);

  return (
    <div id="text-animation__wrapper">
      <audio
        ref={audioRef}
        src="https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_TaDum.mp3"
      />
      <div className="text-animation">Fakeflix</div>
    </div>
  );
};

export default PlayAnimation;
