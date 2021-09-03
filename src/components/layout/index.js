import Head from 'next/head';
import { useSelector } from 'react-redux';
import NavBar from 'components/navbar';
import Modal from 'components/modal';
import ModalVideo from 'components/modal/modal-video';
import Footer from 'components/footer';
import { selectCurrentUser } from 'redux/user/user.selectors';

const Layout = ({
  title = 'Fakeflix - The unofficial Netflix clone',
  containsFooter = false,
  children,
}) => {
  const user = useSelector(selectCurrentUser);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <title key="title">{title}</title>
        <link rel="icon" href="/Fakeflix_favicon_64.ico" key="favicon" />
      </Head>
      {user && (
        <>
          <NavBar />
          <Modal />
          <ModalVideo />
        </>
      )}
      <main className="overflow-hidden">{children}</main>
      {containsFooter && <Footer />}
    </>
  );
};

export default Layout;
