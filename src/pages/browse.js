import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import LogoLink from 'components/link/logo-link';
// import MediaQuery from 'react-responsive'

const Viewport = dynamic(() => import('react-responsive'), { ssr: false });

export default function BrowsePage() {
  const variants = {
    logo: {
      initial: { y: 30, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { duration: 1 } },
      hover: { scale: 1.1 },
    },
  };
  return (
    <>
      <Head>
        <title>Fakeflix - The unofficial Netflix clone</title>
        <link rel="icon" href="/Fakeflix_favicon_64.ico" />
      </Head>

      <div>
        <motion.div
          className="absolute top-8 left-8"
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={variants.logo}
        >
          <Viewport minWidth={600}>
            {(matches) =>
              matches ? (
                <LogoLink href="/login" logoType="desktop" size="sm" />
              ) : (
                <LogoLink href="/login" logoType="mobile" size="md" />
              )
            }
          </Viewport>
        </motion.div>
      </div>
    </>
  );
}
