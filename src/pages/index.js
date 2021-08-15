import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavBar from 'components/navbar';
import Banner from 'components/banner';
import Row from 'components/row';
import Footer from 'components/footer';
import Modal from 'components/modal';
import { fetchMovies, randomPick } from 'utils';
import {
  TOP_RATED_MOVIES_URL,
  POPULAR_MOVIES_URL,
  UPCOMING_MOVIES_URL,
  ACTION_MOVIES_URL,
} from 'const/request-url';
import { selectIsModalOpen } from 'duck/modal/modal.selectors';

export default function Home({ rows }) {
  const [bannerMovie, setBannerMovie] = useState(null);
  const popularMovies = rows[1].movies;
  const isModalOpen = useSelector(selectIsModalOpen);

  useEffect(() => {
    // const timer = setTimeout(() => {
    setBannerMovie(popularMovies[randomPick(popularMovies)]);
    // }, 2000);
    // return () => {
    // clearTimeout(timer);
    // };
  }, []);

  return (
    <>
      <Head>
        <title>Fakeflix - The unofficial Netflix clone</title>
        <link rel="icon" href="/Fakeflix_favicon_64.ico" />
      </Head>
      <NavBar />
      <main className="overflow-hidden">
        <Banner movie={bannerMovie} />
        {rows.map((row, i) => (
          <Row key={i} row={row} />
        ))}
      </main>
      <Footer />
      <Modal isOpen={isModalOpen} />
    </>
  );
}

export async function getStaticProps() {
  const topRatedMovies = await fetchMovies(TOP_RATED_MOVIES_URL);
  const popularMovies = await fetchMovies(POPULAR_MOVIES_URL);
  const upcomingMovies = await fetchMovies(UPCOMING_MOVIES_URL);
  const actionMovies = await fetchMovies(ACTION_MOVIES_URL);

  return {
    props: {
      rows: [
        {
          title: 'Top Rated on Fakeflix',
          movies: topRatedMovies,
        },
        {
          title: 'Trending Now',
          movies: popularMovies,
          isLarge: true,
        },
        {
          title: 'Action',
          movies: actionMovies,
        },
        {
          title: 'Upcoming',
          movies: upcomingMovies,
        },
      ],
    },
  };
}
