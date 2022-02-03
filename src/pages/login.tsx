import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from 'components/Layout';
import { Logo } from 'components/Logo';
import { SignIn } from 'components/SignIn';
import { SignUp } from 'components/SignUp';
import { useAppSelector } from 'redux/hooks';
import { selectCurrentUser } from 'redux/user/user.selectors';

export default function Login() {
  const [isSignedUp, setIsSignedUp] = useState(true);
  const user = useAppSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/intro');
  }, [user]);

  return (
    <Layout title="Fakeflix login">
      <div className="relative w-full min-h-screen">
        <img
          src="/images/login_bg.jpg"
          alt="background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div
          className="
          relative
          w-full min-h-screen
          bg-gray-900 bg-opacity-50
          flex justify-center items-center
        "
        >
          <div className="absolute top-8 left-8 z-10 hidden xs:block">
            <Logo href="/login" logoType="desktop" size="sm" />
          </div>
          <motion.div
            className="
            max-w-90 mx-auto sm:max-w-lg bg-black px-8 py-10 sm:px-12 sm:py-14 bg-opacity-70 rounded-lg z-20
          "
            initial="hidden"
            animate="visible"
            variants={formContainerVariant}
          >
            <p className="text-primary text-sm font-semibold text-center mb-2 xs:mb-5">
              Pay attention: this is not the original Netflix sign in. <br />
              Don&apos;t insert your real credentials here!!
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
      </div>
    </Layout>
  );
}

const formContainerVariant = {
  hidden: { y: 300, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};
