import useSWR from 'swr';
import { Layout } from 'components/Layout';
import { Banner, BannerFallback } from 'components/Banner';
import { Row } from 'components/Row';
import { axiosFetcher, randomPick } from 'utils';
import { homeGenres } from 'constants/data.config';
import { type GenreResponse } from 'constants/request-url';
import { useRequireLogin } from 'hooks';

export default function Home() {
  useRequireLogin();

  const { data } = useSWR<GenreResponse>(
    `/api/titles/movie/trending`,
    axiosFetcher
  );
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
