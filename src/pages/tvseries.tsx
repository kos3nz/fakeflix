import type { GetServerSideProps } from 'next';
import { Layout } from 'components/Layout';
import { Banner, BannerFallback } from 'components/Banner';
import { Row } from 'components/Row';
import { fetchGenreDataWithCache, getGenres, randomPick } from 'utils';
import { type Genres } from 'constants/data.config';
import { type TitleData } from 'constants/request-url';
import { checkUser } from 'db/supabaseClient';

type TVSeriesProps = {
  data: TitleData;
  genres: Genres[];
};

export default function TVSeries({ data, genres }: TVSeriesProps) {
  return (
    <Layout containsFooter>
      {data ? <Banner data={data} /> : <BannerFallback />}
      {genres.map((genre) => (
        <Row key={genre} genre={genre} type="tv" />
      ))}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { user, redirect } = await checkUser(req);
    if (!user) return redirect;

    const { results } = await fetchGenreDataWithCache('trending', 'tv');
    const bannerData = randomPick(results);

    const genres = getGenres('tv');

    return {
      props: {
        data: bannerData,
        user,
        genres,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { data: null },
    };
  }
};
