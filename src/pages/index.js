import { useState, useEffect } from 'react';
import Layout from 'components/layout';
import Banner from 'components/banner';
import Row from 'components/row';
import { fetchResults, randomPick } from 'utils';
import {
  TOP_RATED_MOVIES_URL,
  TRENDING_MOVIES_URL,
  UPCOMING_MOVIES_URL,
  ACTION_MOVIES_URL,
} from 'const/request-url';

export default function Home({ rows }) {
  const [bannerMovie, setBannerMovie] = useState(null);
  const trendingMovies = rows[1].movies;

  useEffect(() => {
    // const timer = setTimeout(() => {
    setBannerMovie(randomPick(trendingMovies));
    // }, 2000);
    // return () => {
    // clearTimeout(timer);
    // };
  }, []);

  return (
    <Layout>
      <Banner movie={bannerMovie} />
      {rows.map((row, i) => (
        <Row key={i} row={row} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const topRatedMovies = await fetchResults(TOP_RATED_MOVIES_URL);
  const trendingMovies = await fetchResults(TRENDING_MOVIES_URL);
  const upcomingMovies = await fetchResults(UPCOMING_MOVIES_URL);
  const actionMovies = await fetchResults(ACTION_MOVIES_URL);

  return {
    props: {
      rows: [
        {
          title: 'Top Rated on Fakeflix',
          movies: topRatedMovies,
        },
        {
          title: 'Trending Now',
          movies: trendingMovies,
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
