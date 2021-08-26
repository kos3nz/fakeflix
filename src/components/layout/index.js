import Head from 'next/head';
import Footer from 'components/footer';

const Layout = ({ containsFooter = true, children }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <title key="title">Fakeflix - The unofficial Netflix clone</title>
        <link rel="icon" href="/Fakeflix_favicon_64.ico" key="favicon" />
      </Head>
      <main className="overflow-hidden">{children}</main>
      {containsFooter && <Footer />}
    </>
  );
};

export default Layout;
