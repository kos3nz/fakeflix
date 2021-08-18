import { useState } from 'react';
import Layout from 'components/layout';
import Poster from 'components/poster';
import { capitalize, fetchResults } from 'utils';
import {
  TOP_RATED_MOVIES_URL,
  UPCOMING_MOVIES_URL,
  TRENDING_MOVIES_URL,
  CATEGORY_MOVIES_URL,
} from 'const/request-url';
import { moviesCategoryPaths, genresIdObj } from 'const/data.config';

const MoviesCategory = ({ title, results }) => {
  const [movies, setMovies] = useState(results);

  const handleData = () => setMovies((state) => [...state, ...results]);

  return (
    <Layout>
      <div className="w-full pt-[120px] lg:pt-20 ">
        <div className="py-8 px-[4vw]">
          <h2 className="text-xl font-bold capitalize mb-6">{title}</h2>
          <div className="category-grid">
            {movies.map((movie, i) => (
              <Poster key={i} movie={movie} />
            ))}
          </div>
          <button onClick={handleData}>more</button>
        </div>
      </div>
    </Layout>
  );
};

export default MoviesCategory;

export async function getStaticPaths() {
  const paths = moviesCategoryPaths.map((genre) => {
    return {
      // params: { category: encodeURIComponent(genre) },
      params: { category: genre },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params: { category } }) {
  let moviesUrl;
  switch (category) {
    case 'top_rated': {
      moviesUrl = TOP_RATED_MOVIES_URL;
      break;
    }
    case 'trending': {
      moviesUrl = TRENDING_MOVIES_URL;
      break;
    }
    case 'upcoming': {
      moviesUrl = UPCOMING_MOVIES_URL;
      break;
    }
    default: {
      const genreId = genresIdObj[category];
      moviesUrl = `${CATEGORY_MOVIES_URL}${genreId}`;
      break;
    }
  }

  const title =
    category === 'top_rated'
      ? capitalize(...category.split('_'))
      : capitalize(category);

  const results = await fetchResults(moviesUrl);
  return {
    props: {
      title,
      results,
    },
  };
}

/*
const pids = ['id1', 'id2', 'id3']
{
  pids.map((pid) => (
    <Link href="/post/[pid]" as={`/post/${pid}`}>
      <a>Post {pid}</a>
    </Link>
  ))
}

or

function Home() {
  return (
    <div>
      <Link href={{ pathname: '/about', query: { name: 'test' } }}>
        <a>About us</a>
      </Link>
    </div>
  )
}
*/
