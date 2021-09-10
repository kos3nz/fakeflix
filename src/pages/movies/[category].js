import { useState, useEffect } from 'react';
import Layout from 'components/layout';
import Poster from 'components/poster';
import {
  fetchResults,
  attachOfficialTrailerKeysToResults,
  loadMore,
} from 'utils';
import { genresData } from 'const/data.config';
import { useIntersectionObserver, useRequireLogin } from 'hooks';

const MoviesCategory = ({ title, moviesUrl, results, totalPages }) => {
  const [movies, setMovies] = useState(results || []);
  const [page, setPage] = useState(2);
  const [bottomPageRef, isIntersecting] = useIntersectionObserver();

  useEffect(() => {
    if (bottomPageRef && isIntersecting && page <= totalPages) {
      loadMore(moviesUrl, page, setPage, setMovies, 'movie');
    }
  }, [bottomPageRef, isIntersecting]);

  useRequireLogin();

  return (
    <Layout>
      <div className="w-full pt-16">
        <div className="py-8 px-[4vw]">
          <h2 className="text-xl font-bold capitalize mb-6">{title}</h2>
          <div className="category-grid">
            {movies.map((movie, i) => (
              <Poster key={i} movie={movie} />
            ))}
          </div>
          <div ref={bottomPageRef} className="w-full h-1" />
        </div>
      </div>
    </Layout>
  );
};

export default MoviesCategory;

export async function getStaticPaths() {
  const paths = genresData
    .filter((genre) => genre.url.movie) // returns only genre.url.movie value is true
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
    const moviesUrl = data.url.movie;
    const { results, totalPages } = await fetchResults(moviesUrl);
    await attachOfficialTrailerKeysToResults(results, 'movie');

    return {
      props: {
        title,
        moviesUrl,
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
