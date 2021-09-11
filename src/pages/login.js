import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Layout from 'components/layout';
import LogoLink from '../components/link/logo-link';
import SignIn from 'components/form/sign-in';
import SignUp from 'components/form/sign-up';
import signinBg from 'images/Fakeflix_signin_bg.jpg';
import { selectCurrentUser } from 'redux/user/user.selectors';

export default function Login() {
  const [isSignedUp, setIsSignedUp] = useState(true);
  const user = useSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/intro');
  }, [user]);

  return (
    <Layout title="Fakeflix login">
      <div className="absolute top-0 left-0 w-full min-h-screen">
        <Image
          src={signinBg}
          alt="image background"
          layout="fill"
          priority={true}
          objectFit="cover"
          quality={60}
          loading="eager"
          objectPosition="center"
        />
      </div>
      <div
        className="
          relative
          w-full min-h-screen
          bg-gray-900 bg-opacity-50
          flex justify-center items-center
        "
      >
        <div className="absolute top-8 left-8 z-10 hidden xs:block">
          <LogoLink href="/login" logoType="desktop" size="sm" />
        </div>
        <motion.div
          className="
            max-w-90 mx-auto sm:max-w-lg bg-black px-8 py-10 sm:px-12 sm:py-16 bg-opacity-70 rounded-lg z-20
          "
          initial="hidden"
          animate="visible"
          variants={formContainerVariant}
        >
          <h2 className="text-paragraph text-xl xs:text-2xl font-semibold">
            {isSignedUp ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="text-primary text-sm font-semibold text-center mt-4 xs:mt-5 mb-2 xs:mb-4">
            Pay attention: this is not the original Netflix sign in. Don't
            insert your real credentials here!!
          </p>
          {isSignedUp ? <SignIn /> : <SignUp />}
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
                  text-primary font-bold
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
    </Layout>
  );
}

const formContainerVariant = {
  hidden: { y: 300, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};
