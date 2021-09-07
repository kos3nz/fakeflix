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

const TVSeriesPage = ({ rows }) => {
  if (rows.length === 0) return <div>Loading...</div>;

  const [bannerTitle, setBannerTitle] = useState(null);
  const originalsTitles = rows[1].movies;
  const user = useRequireLogin();

  useEffect(() => {
    setBannerTitle(randomPick(originalsTitles));
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

export default TVSeriesPage;

export async function getStaticProps() {
  try {
    const type = 'tv';

    // filter out if genreData does not have a url for the tv series
    const tvSeriesData = genresData.filter((data) => {
      return data.url.tv;
    });

    // get an array of the urls
    const urls = tvSeriesData.map((data) => {
      return data.url.tv;
    });

    // fetch all the tv series data
    const requests = urls.map((url) => fetch(url));
    const allTVSeries = await fetchAll(requests);

    // fetch all the video keys if they are on YouTube
    for (const tvSeries of allTVSeries) {
      const results = tvSeries.results;
      await attachOfficialTrailerKeysToResults(results, type);
    }

    // put all the data into rows variable
    const rows = tvSeriesData.map((data, i) => {
      return { ...data, movies: allTVSeries[i].results, type };
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
