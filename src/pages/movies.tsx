import { type GetServerSideProps } from 'next';
import useSWR from 'swr';
import { Layout } from 'components/Layout';
import { Banner, BannerFallback } from 'components/Banner';
import { Row } from 'components/Row';
import { getGenres, getResults, randomPick } from 'utils';
import { type TitleData } from 'constants/request-url';
import { checkUser } from 'db/supabaseClient';

const type = 'movie';
const bannerGenre = 'trending';
const genres = getGenres(type);

export default function Movies() {
  const { data } = useSWR<TitleData[]>(
    `/api/titles/${type}/${bannerGenre}`,
    getResults
  );
  const bannerData = data && randomPick(data);

  return (
    <Layout containsFooter>
      {bannerData ? <Banner data={bannerData} /> : <BannerFallback />}
      {genres.map((genre) => (
        <Row key={genre} genre={genre} type="movie" />
      ))}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { user, redirect } = await checkUser(req);
    if (!user) return redirect;

    return {
      props: {},
    };
  } catch (error) {
    console.log(error);
    return {
      props: { data: null },
    };
  }
};
