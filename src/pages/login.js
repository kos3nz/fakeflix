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
            className="
                max-w-90 mx-auto sm:max-w-lg bg-black px-8 py-10 sm:px-12 sm:py-16 bg-opacity-70 rounded-lg z-20
              "
            initial="hidden"
            animate="visible"
            variants={variants.container}
          >
            <h2 className="text-gray-200 text-xl xs:text-2xl font-semibold">
              {isSignedUp ? 'Sign In' : 'Sign Up'}
            </h2>
            <p className="text-red-600 text-sm font-semibold text-center mt-4 xs:mt-5 mb-2 xs:mb-4">
              Pay attention: this is not the original Netflix sign in. Don't
              insert your real credentials here!!
            </p>
            {isSignedUp ? (
              <SignIn variants={variants} />
            ) : (
              <SignUp variants={variants} />
            )}
            <hr className="mt-6 w-11/12 mx-auto text-gray-500" />
            <p
              className="
                mt-6
                text-sm md:text-base text-center
              text-gray-500
              "
            >
              {isSignedUp
                ? "Haven't you registered yet?"
                : 'Do you already have an account?'}

              <span
                className="
                  ml-2 inline-block
                  text-red-600 font-bold
                  cursor-pointer
                  duration-300
                hover:text-red-700 hover:transform-gpu hover:scale-95
                "
                onClick={() => setIsSignedUp((state) => !state)}
              >
                {isSignedUp ? 'Sign Up' : 'Sign In'}
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
