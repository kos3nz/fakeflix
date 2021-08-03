import Head from 'next/head';
import { motion } from 'framer-motion';
import NavBar from 'components/navbar';
import Header from 'components/header';

export default function HomePage() {
  // const { scrollY } = useViewportScroll();
  // console.log(scrollY);

  return (
    <>
      <Head>
        <title>Fakeflix - The unofficial Netflix clone</title>
        <link rel="icon" href="/Fakeflix_favicon_64.ico" />
      </Head>
      <div className="w-full h-screen bg-gray-900">
        <NavBar />
        <Header />
      </div>
    </>
  );
}
