import { useState, useEffect } from 'react';
import Layout from 'components/layout';
import Poster from 'components/poster';
import {
  attachOfficialTrailerKeysToResults,
  fetchResults,
  loadMore,
} from 'utils';
import { genresData } from 'const/data.config';
import { useIntersectionObserver, useRequireLogin } from 'hooks';

const TvSeriesCategory = ({ title, tvSeriesUrl, results, totalPages }) => {
  const [tvSeries, setTvSeries] = useState(results);
  const [page, setPage] = useState(2);
  const [bottomPageRef, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (bottomPageRef && isIntersecting && page <= totalPages) {
      loadMore(tvSeriesUrl, page, setPage, setTvSeries, 'tv');
    }
  }, [isIntersecting]);

  useRequireLogin();

  return (
    <Layout>
      <div className="w-full pt-16">
        <div className="py-8 px-[4vw]">
          <h2 className="text-xl font-bold capitalize mb-6">{title}</h2>
          <div className="category-grid">
            {tvSeries.map((movie, i) => (
              <Poster key={i} movie={movie} />
            ))}
          </div>
          <div ref={bottomPageRef} className="w-full h-10" />
        </div>
      </div>
    </Layout>
  );
};

export default TvSeriesCategory;

export async function getStaticPaths() {
  const paths = genresData
    .filter((genre) => genre.url.tv) // returns only genre.url.movie value is true
    .map((genre) => {
      return {
        // params: { category: encodeURIComponent(genre) },
        params: { category: genre.slug },
      };
    });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category } }) {
  try {
    const data = genresData.filter((genre) => genre.slug === category)[0];
    const title = data.title;
    const tvSeriesUrl = data.url.tv;
    const { results, totalPages } = await fetchResults(tvSeriesUrl);
    await attachOfficialTrailerKeysToResults(results, 'tv');

    return {
      props: {
        title,
        tvSeriesUrl,
        results,
        totalPages,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}
