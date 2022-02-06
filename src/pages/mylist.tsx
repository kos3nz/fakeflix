import { Layout } from 'components/Layout';
import { Poster } from 'components/Poster';
import { GetServerSideProps } from 'next';
import { checkUser } from 'db/supabaseClient';
import { useAppSelector } from 'redux/hooks';
import { selectFavoritesList } from 'redux/favorites/favorites.selectors';

export default function MyList() {
  const list = useAppSelector(selectFavoritesList);
  const isEmpty = !(list.length > 0);

  return (
    <Layout>
      <div className="w-full pt-16">
        <div className="py-8 px-[4vw]">
          <h2 className="mb-6 text-xl font-bold capitalize">My List</h2>
          <div className="genre-grid">
            {list.map((data, i) => (
              <Poster key={i} data={data} />
            ))}
          </div>
          {isEmpty && (
            <div className="flex justify-center pt-8">
              <h2 className="text-xl font-bold">Your list is empty.</h2>
            </div>
          )}
        </div>
      </div>
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
