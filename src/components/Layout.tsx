import Head from 'next/head';
import { useRouter } from 'next/router';
import { NavBar } from 'components/NavBar';
import { Modal } from 'components/Modal';
import { ModalVideo } from 'components/ModalVideo';
import { Footer } from 'components/Footer';
import { useAppSelector } from 'redux/hooks';
import { selectCurrentUser } from 'redux/user/user.selectors';

type LayoutProps = {
  title?: string;
  containsFooter?: boolean;
  children: React.ReactNode;
};

export const Layout = ({
  title = 'Fakeflix - The unofficial Netflix clone',
  containsFooter = false,
  children,
}: LayoutProps) => {
  const user = useAppSelector(selectCurrentUser);
  const { asPath } = useRouter();

  return (
    <>
      {(!user && asPath !== '/login') || (user && asPath === '/login') ? (
        // if user isn't logged in, browser shows nothing until it redirects to login page
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
            key="viewport"
          />
          <title key="title">{title}</title>
          <link rel="icon" href="/Fakeflix_favicon_64.ico" key="favicon" />
        </Head>
      ) : (
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
          <main className="relative overflow-hidden">{children}</main>
          {containsFooter && <Footer />}
        </>
      )}
    </>
  );
};
