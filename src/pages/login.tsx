import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Logo } from 'components/Logo';
import { SignIn } from 'components/SignIn';
import { SignUp } from 'components/SignUp';
import { useAppSelector } from 'redux/hooks';
import { selectLoginStatus } from 'redux/user/user.selectors';
import { GetServerSideProps } from 'next';
import { checkUser } from 'db/supabaseClient';
import { Head } from 'components/Head';

export default function Login() {
  const router = useRouter();
  const status = useAppSelector(selectLoginStatus);
  const [isSignedUp, setIsSignedUp] = useState(true);

  useEffect(() => {
    if (status?.type !== 'SIGN_OUT' && status?.status === 'success')
      router.push('/intro');
  }, [status]);

  return (
    <>
      <Head title="Fakeflix Login" />
      <main className="relative overflow-hidden">
        <div className="min-h-screen w-full">
          <img
            src="/images/login_bg.jpg"
            alt="background"
            className="absolute top-0 left-0 h-full w-full object-cover"
          />
          <div
            className="
            relative
            flex min-h-screen
            w-full items-center
            justify-center bg-gray-900 bg-opacity-50
          "
          >
            <div className="absolute top-8 left-8 z-10 hidden xs:block">
              <Logo href="/login" logoType="desktop" size="sm" />
            </div>
            <motion.div
              className="
            z-20 mx-auto max-w-90 rounded-lg bg-black bg-opacity-70 px-8 py-10 sm:max-w-lg sm:px-12 sm:py-14
          "
              initial="hidden"
              animate="visible"
              variants={formContainerVariant}
            >
              <p className="mb-2 text-center text-sm font-semibold text-primary xs:mb-5">
                Pay attention: This is not the original Netflix sign in. <br />
                Don&apos;t insert your real credentials here!!
              </p>
              {isSignedUp ? <SignIn /> : <SignUp />}
              <hr className="mx-auto mt-6 w-11/12 text-gray-500" />
              <p
                className="
                mt-6
                text-center text-sm text-gray-500
              md:text-base
              "
              >
                {isSignedUp
                  ? "Haven't you registered yet?"
                  : 'Do you already have an account?'}
                <span
                  className="
                  ml-2 inline-block
                  cursor-pointer font-bold
                  text-primary
                  duration-300
                hover:scale-95 hover:transform-gpu hover:text-red-700
                "
                  onClick={() => setIsSignedUp((state) => !state)}
                >
                  {isSignedUp ? 'Sign Up' : 'Sign In'}
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

const formContainerVariant = {
  hidden: { y: 300, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { user, redirect } = await checkUser(req, '/');

    if (user) return redirect;

    return {
      props: {},
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
