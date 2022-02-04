import { Head } from 'components/Head';
import { NavBar } from 'components/NavBar';
import { Modal } from 'components/Modal';
import { ModalVideo } from 'components/ModalVideo';
import { Footer } from 'components/Footer';
import { useEffect } from 'react';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setUser } from 'redux/user/user.slice';
import { User as SupabaseUser } from '@supabase/supabase-js';
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
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get<{ user: SupabaseUser }>(
          '/api/auth/getUser'
        );
        dispatch(setUser(data.user));
      } catch (error) {
        console.error(error);
      }
    };

    if (!user) getUser();
  }, []);

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
