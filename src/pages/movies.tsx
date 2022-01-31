import { type GetServerSideProps } from 'next';
import { Layout } from 'components/Layout';
import { Banner, BannerFallback } from 'components/Banner';
import { Row } from 'components/Row';
import { fetchGenreDataWithCache, randomPick } from 'utils';
import { useRequireLogin } from 'hooks';
import { movieGenres } from 'constants/data.config';
import { type TitleData } from 'constants/request-url';
import { checkUser } from 'db/supabaseClient';

type MoviesProps = {
  data: TitleData;
};

export default function Movies({ data }: MoviesProps) {
  useRequireLogin();

  return (
    <Layout containsFooter>
      {data ? <Banner data={data} /> : <BannerFallback />}
      {movieGenres.map((genre) => (
        <Row key={genre} genre={genre} type="movie" />
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
        data: bannerData,
        user,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { data: null },
    };
  }
};
