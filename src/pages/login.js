import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import LogoLink from '../components/link/logo-link';
import SignIn from 'components/form/auth/sign-in';
import SignUp from 'components/form/auth/sign-up';

export default function LoginPage() {
  const [isSignedUp, setIsSignedUp] = useState(true);

  const variants = {
    logo: {
      initial: { y: 30, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration: 1 } },
      hover: { scale: 1.1 },
    },
    container: {
      hidden: { y: 300, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    },
    form: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
      },
    },
  };

  return (
    <>
      <Head>
        <title>Fakeflix Login</title>
        <link rel="icon" href="/Fakeflix_favicon_64.ico" />
      </Head>
      <div
        className="w-full bg-cover h-screen bg-center"
        style={{
          backgroundImage:
            'url("https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_signin_bg.jpg")',
        }}
      >
        <div
          className="
            w-full h-screen
            bg-gray-900 bg-opacity-50
            flex justify-center items-center
          "
        >
          <motion.div
            className="absolute top-8 left-8 z-10 hidden xs:block"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={variants.logo}
          >
            <LogoLink
              href="/browse"
              imageUrl="https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_logo.png"
            />
          </motion.div>
          <motion.div
            className="z-20"
            initial="hidden"
            animate="visible"
            variants={variants.container}
          >
            {isSignedUp ? (
              <SignIn toggleAuth={setIsSignedUp} variants={variants} />
            ) : (
              <SignUp toggleAuth={setIsSignedUp} variants={variants} />
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
