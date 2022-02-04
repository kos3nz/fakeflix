import { Head } from 'components/Head';
import { NavBar } from 'components/NavBar';
import { Modal } from 'components/Modal';
import { ModalVideo } from 'components/ModalVideo';
import { Footer } from 'components/Footer';

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
  return (
    <>
      <Head title={title} />
      <NavBar />
      <Modal />
      <ModalVideo />
      <main className="relative overflow-hidden">{children}</main>
      {containsFooter && <Footer />}
    </>
  );
};
