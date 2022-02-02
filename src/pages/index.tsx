import useSWR from 'swr';
import { Layout } from 'components/Layout';
import { Banner, BannerFallback } from 'components/Banner';
import { Row } from 'components/Row';
import { fetchGenreData, randomPick } from 'utils';
import { genresData, homeGenres } from 'constants/data.config';
import { type GenreResponse } from 'constants/request-url';
import { useRequireLogin } from 'hooks';

const type = 'movie';
const url = genresData.trending.url[type];

export default function Home() {
  useRequireLogin();

  const { data } = useSWR([url, 1, type], fetchGenreData);
  const bannerData = data && randomPick(data.results);

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
