import { useState, useEffect } from 'react';
import Layout from 'components/layout';
import Banner from 'components/banner';
import Row from 'components/row';
import {
  attachOfficialTrailerKeysToResults,
  fetchAll,
  randomPick,
} from 'utils';
import { genresData } from 'const/data.config';
import { useRequireLogin } from 'hooks';

const Movies = ({ rows }) => {
  if (rows.length === 0) return <div>Loading...</div>;

  const [bannerTitle, setBannerTitle] = useState(null);
  const trendingTitles = rows[1].movies;
  const user = useRequireLogin();

  useEffect(() => {
    setBannerTitle(randomPick(trendingTitles));
  }, []);

  if (!user) return <div>redirecting...</div>;

  return (
    <Layout containsFooter>
      <Banner movie={bannerTitle} />
      {rows.map((row, i) => (
        <Row key={i} row={row} />
      ))}
    </Layout>
  );
};

export default Movies;

export async function getStaticProps() {
  try {
    const type = 'movie';

    // filter out if genreData does not have a url for the movie
    const moviesData = genresData.filter((data) => {
      return data.url.movie;
    });

    // get an array of the urls
    const urls = moviesData.map((data) => {
      return data.url.movie;
    });

    // fetch all the movies data
    const requests = urls.map((url) => fetch(url));
    const allMovies = await fetchAll(requests);

    // fetch all the video keys if they are on YouTube
    for (const movies of allMovies) {
      const results = movies.results;
      await attachOfficialTrailerKeysToResults(results, type);
    }

    // put all the data into rows variable
    const rows = moviesData.map((data, i) => {
      return { ...data, movies: allMovies[i].results, type };
    });

    return {
      props: {
        rows,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { rows: [] },
    };
  }
}
