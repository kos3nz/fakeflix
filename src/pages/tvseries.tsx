import useSWR from 'swr';
import { Layout } from 'components/Layout';
import { Banner, BannerFallback } from 'components/Banner';
import { Row } from 'components/Row';
import { fetchGenreData, randomPick } from 'utils';
import { genresData, tvSeriesGenres } from 'constants/data.config';
import { type GenreResponse } from 'constants/request-url';
import { useRequireLogin } from 'hooks';

const type = 'tv';
const url = genresData.trending.url[type];

export default function TVSeries() {
  useRequireLogin();

  const { data } = useSWR([url, 1, type], fetchGenreData);
  const bannerData = data && randomPick(data.results);

  return (
    <Layout containsFooter>
      {bannerData ? <Banner data={bannerData} /> : <BannerFallback />}
      {tvSeriesGenres.map((genre) => (
        <Row key={genre} genre={genre} type="tv" />
      ))}
    </Layout>
  );
}
