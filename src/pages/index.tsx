import { Layout } from 'components/Layout';
import { Banner, BannerFallback } from 'components/Banner';
import { Row } from 'components/Row';
import { useRequireLogin } from 'hooks';
import { homeGenres } from 'const/data.config';
import { fetchGenreDataWithCache, randomPick } from 'utils';
import { type TitleData } from 'const/request-url';
import { GetServerSideProps } from 'next';

type HomeProps = {
  data: TitleData;
};

export default function Home({ data }: HomeProps) {
  useRequireLogin();

  return (
    <Layout containsFooter>
      {data ? <Banner data={data} /> : <BannerFallback />}
      {homeGenres.map((genre) => (
        <Row
          key={genre}
          genre={genre}
          type={genre === 'originals' ? 'tv' : 'movie'}
        />
      ))}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { results } = await fetchGenreDataWithCache('trending', 'movie');
    const bannerData = randomPick(results);

    return {
      props: {
        data: bannerData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { data: null },
    };
  }
};
