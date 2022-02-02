import type { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import useInView from 'react-cool-inview';
import { Layout } from 'components/Layout';
import { Poster } from 'components/Poster';
import { Spinner } from 'components/Spinner';
import { getPaths } from 'utils';
import { genresData, type Genres, type MediaType } from 'constants/data.config';
import { useInfiniteFetchData, useRequireLogin } from 'hooks';

type TVGenreProps = {
  url: string;
  title: string;
  type: MediaType;
};

export default function TVGenre({ url, type, title }: TVGenreProps) {
  useRequireLogin();

  const { titles, totalPages, reachedEnd, size, setSize } =
    useInfiniteFetchData(url, type);

  const { observe, inView } = useInView({
    rootMargin: '150px',
  });

  useEffect(() => {
    if (totalPages && inView && size < totalPages) {
      setSize(size + 1);
    }
  }, [inView]);

  return (
    <Layout>
      <div className="w-full pt-16">
        <div className="py-8 px-[4vw]">
          <h2 className="text-xl font-bold capitalize mb-6">
            {title || 'There is no such genre.'}
          </h2>
          <div className="genre-grid">
            {titles && titles.map((data, i) => <Poster key={i} data={data} />)}
          </div>
          {!reachedEnd && (
            <div ref={observe} className="flex justify-center pt-4">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPaths('tv');

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const genre = params?.genre as Genres;
  const type = 'tv';
  const { title, url } = genresData[genre];
  const genreUrl = url[type];

  return {
    props: {
      title,
      type,
      url: genreUrl,
    },
  };
};
