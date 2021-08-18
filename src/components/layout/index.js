import Head from 'next/head';
import NavBar from 'components/navbar';
import Footer from 'components/footer';
import Modal from 'components/modal';

const Layout = ({ children }) => {
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
      <NavBar />
      <main className="overflow-hidden">{children}</main>
      <Footer />
      <Modal />
    </>
  );
};

export default Layout;
