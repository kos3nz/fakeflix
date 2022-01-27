import Layout from 'components/layout';
import { Banner, BannerFallback } from 'components/Banner';
import { Row } from 'components/Row';
import { fetchGenreDataWithCache, randomPick } from 'utils';
import { useRequireLogin } from 'hooks';
import { tvSeriesGenres } from 'const/data.config';

export default function Movies({ data }) {
  useRequireLogin();

  return (
    <Layout containsFooter>
      {data ? <Banner data={data} /> : <BannerFallback />}
      {tvSeriesGenres.map((genre) => (
        <Row key={genre} genre={genre} type="tv" />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const { results } = await fetchGenreDataWithCache('trending', 'tv');
    const bannerData = randomPick(results);

    return {
      props: {
        data: bannerData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { data: null },
    };
  }
}
