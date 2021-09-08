import { useState, useEffect } from 'react';
import Layout from 'components/layout';
import Banner from 'components/banner';
import Row from 'components/row';
import {
  attachOfficialTrailerKeysToResults,
  fetchAll,
  randomPick,
} from 'utils';
import { genresData, homeTitles } from 'const/data.config';
import { useRequireLogin } from 'hooks';

export default function Home({ rows }) {
  if (rows.length === 0) return <div>Loading...</div>;

  const [bannerMovie, setBannerMovie] = useState(null);
  const trendingTitles = rows[1].movies;

  useEffect(() => {
    setBannerMovie(randomPick(trendingTitles));
  }, []);

  useRequireLogin();

  return (
    <Layout containsFooter>
      <Banner movie={bannerMovie} />
      {rows.map((row, i) => (
        <Row key={i} row={row} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    // pick genres that included in homeTitles
    const homeData = genresData.filter((data) => {
      return homeTitles.includes(data.slug);
    });

    // get an array of the urls
    const urls = homeData.map((data) => {
      if (data.slug === 'originals') return data.url.tv;
      // else if (data.slug === 'trending') return data.url.all;
      else return data.url.movie;
    });

    // fetch all the data
    const requests = urls.map((url) => fetch(url));
    const allMovies = await fetchAll(requests);

    // fetch all the video keys if they are on YouTube
    for (let i = 0; i < allMovies.length; i++) {
      const type = homeTitles[i] === 'originals' ? 'tv' : 'movie';
      const results = allMovies[i].results;
      await attachOfficialTrailerKeysToResults(results, type);
    }

    // put all the data into rows variable
    const rows = homeData.map((data, i) => {
      const type = data.slug === 'originals' ? 'tv' : 'movie';

      return { ...data, movies: allMovies[i].results, type };
    });

    return {
      props: {
        rows,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { rows: [] },
    };
  }
}
