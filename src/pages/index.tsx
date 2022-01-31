import { type GetServerSideProps } from 'next';
import { Layout } from 'components/Layout';
import { Banner, BannerFallback } from 'components/Banner';
import { Row } from 'components/Row';
import { useRequireLogin } from 'hooks';
import { homeGenres } from 'constants/data.config';
import { fetchGenreDataWithCache, randomPick } from 'utils';
import { type TitleData } from 'constants/request-url';
import { checkUser } from 'db/supabaseClient';

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { user, redirect } = await checkUser(req);
    if (!user) return redirect;

    const { results } = await fetchGenreDataWithCache('trending', 'movie');
    const bannerData = randomPick(results);

    return {
      props: {
        user,
        data: bannerData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
