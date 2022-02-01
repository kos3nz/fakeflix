import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';

const Intro = () => {
  const router = useRouter();

  const playIntroSound = () => {
    const audio = new Audio(
      'https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_TaDum.mp3'
    );

    // to play the audio, you need to click the browser
    audio.oncanplaythrough = () => {
      const playedPromise = audio.play();
      if (playedPromise) {
        playedPromise
          .then(() => {
            // console.log('playing sound !!!');
          })
          .catch((error) => {
            console.error(error);
            if (
              error.name === 'NotAllowedError' ||
              error.name === 'NotSupportedError'
            ) {
              console.error(error.name);
            }
          });
      }
    };
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      playIntroSound();
    }, 200);
    setTimeout(() => {
      router.replace('/');
    }, 6000);
  }, []);

  return (
    <motion.div
      id="intro-animation__wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="netflix-intro" data-letter="F">
        <div className="helper-1">
          <div className="effect-brush front">
            <span className="fur-1"></span>
            <span className="fur-2"></span>
            <span className="fur-3"></span>
            <span className="fur-4"></span>
            <span className="fur-5"></span>
            <span className="fur-6"></span>
            <span className="fur-7"></span>
            <span className="fur-8"></span>
            <span className="fur-9"></span>
            <span className="fur-10"></span>
            <span className="fur-11"></span>
            <span className="fur-12"></span>
            <span className="fur-13"></span>
            <span className="fur-14"></span>
            <span className="fur-15"></span>
            <span className="fur-16"></span>
            <span className="fur-17"></span>
            <span className="fur-18"></span>
            <span className="fur-19"></span>
            <span className="fur-20"></span>
            <span className="fur-21"></span>
            <span className="fur-22"></span>
            <span className="fur-23"></span>
            <span className="fur-24"></span>
            <span className="fur-25"></span>
            <span className="fur-26"></span>
            <span className="fur-27"></span>
            <span className="fur-28"></span>
            <span className="fur-29"></span>
            <span className="fur-30"></span>
            <span className="fur-31"></span>
          </div>
          <div className="effect-illumination">
            <span className="lamp-1"></span>
            <span className="lamp-2"></span>
            <span className="lamp-3"></span>
            <span className="lamp-4"></span>
            <span className="lamp-5"></span>
            <span className="lamp-6"></span>
            <span className="lamp-7"></span>
            <span className="lamp-8"></span>
            <span className="lamp-9"></span>
            <span className="lamp-10"></span>
            <span className="lamp-11"></span>
            <span className="lamp-12"></span>
            <span className="lamp-13"></span>
            <span className="lamp-14"></span>
            <span className="lamp-15"></span>
            <span className="lamp-16"></span>
            <span className="lamp-17"></span>
            <span className="lamp-18"></span>
            <span className="lamp-19"></span>
            <span className="lamp-20"></span>
            <span className="lamp-21"></span>
            <span className="lamp-22"></span>
            <span className="lamp-23"></span>
            <span className="lamp-24"></span>
            <span className="lamp-25"></span>
            <span className="lamp-26"></span>
            <span className="lamp-27"></span>
            <span className="lamp-28"></span>
            <span className="lamp-29"></span>
            <span className="lamp-30"></span>
            <span className="lamp-31"></span>
          </div>
        </div>
        <div className="helper-2">
          <div className="effect-brush back">
            <span className="fur-1 backside"></span>
            <span className="fur-2 backside"></span>
            <span className="fur-3 backside"></span>
            <span className="fur-4 backside"></span>
            <span className="fur-5 backside"></span>
            <span className="fur-6 backside"></span>
            <span className="fur-7 backside"></span>
            <span className="fur-8 backside"></span>
            <span className="fur-9 backside"></span>
            <span className="fur-10 backside"></span>
            <span className="fur-11 backside"></span>
            <span className="fur-12 backside"></span>
            <span className="fur-13 backside"></span>
            <span className="fur-14 backside"></span>
            <span className="fur-15 backside"></span>
            <span className="fur-16 backside"></span>
            <span className="fur-17 backside"></span>
            <span className="fur-18 backside"></span>
            <span className="fur-19 backside"></span>
            <span className="fur-20 backside"></span>
            <span className="fur-21 backside"></span>
            <span className="fur-22 backside"></span>
            <span className="fur-23 backside"></span>
            <span className="fur-24 backside"></span>
            <span className="fur-25 backside"></span>
            <span className="fur-26 backside"></span>
            <span className="fur-27 backside"></span>
            <span className="fur-28 backside"></span>
            <span className="fur-29 backside"></span>
            <span className="fur-30 backside"></span>
            <span className="fur-31 backside"></span>
          </div>
        </div>
        <div className="helper-3">
          <div className="effect-brush back">
            <span className="fur-1 backside"></span>
            <span className="fur-2 backside"></span>
            <span className="fur-3 backside"></span>
            <span className="fur-4 backside"></span>
            <span className="fur-5 backside"></span>
            <span className="fur-6 backside"></span>
            <span className="fur-7 backside"></span>
            <span className="fur-8 backside"></span>
            <span className="fur-9 backside"></span>
            <span className="fur-10 backside"></span>
            <span className="fur-11 backside"></span>
            <span className="fur-12 backside"></span>
            <span className="fur-13 backside"></span>
            <span className="fur-14 backside"></span>
            <span className="fur-15 backside"></span>
            <span className="fur-16 backside"></span>
            <span className="fur-17 backside"></span>
            <span className="fur-18 backside"></span>
            <span className="fur-19 backside"></span>
            <span className="fur-20 backside"></span>
            <span className="fur-21 backside"></span>
            <span className="fur-22 backside"></span>
            <span className="fur-23 backside"></span>
            <span className="fur-24 backside"></span>
            <span className="fur-25 backside"></span>
            <span className="fur-26 backside"></span>
            <span className="fur-27 backside"></span>
            <span className="fur-28 backside"></span>
            <span className="fur-29 backside"></span>
            <span className="fur-30 backside"></span>
            <span className="fur-31 backside"></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Intro;
