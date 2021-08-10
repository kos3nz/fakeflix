import Head from 'next/head';
import NavBar from 'components/navbar';
import Banner from 'components/banner';
import Row from 'components/row';
import movies from 'const/movies-data';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Fakeflix - The unofficial Netflix clone</title>
        <link rel="icon" href="/Fakeflix_favicon_64.ico" />
      </Head>
      <NavBar />
      <main>
        <Banner movie={movies[1]} />
        {Array(3)
          .fill('test')
          .map((v, i) => (
            <Row key={i} movies={movies} />
          ))}
      </main>
    </>
  );
}
