import { type GetServerSideProps } from 'next';
import useSWR from 'swr';
import { Layout } from 'components/Layout';
import { Banner, BannerFallback } from 'components/Banner';
import { Row } from 'components/Row';
import { homeGenres } from 'constants/data.config';
import { getResults, randomPick } from 'utils';
import { type TitleData } from 'constants/request-url';
import { checkUser } from 'db/supabaseClient';

const type = 'movie';
const genre = 'trending';

export default function Home() {
  const { data } = useSWR<TitleData[]>(
    `/api/titles/${type}/${genre}`,
    getResults
  );
  const bannerData = data && randomPick(data);

  return (
    <Layout containsFooter>
      {bannerData ? <Banner data={bannerData} /> : <BannerFallback />}
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

    return {
      props: {},
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};
