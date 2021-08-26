import { Provider } from 'react-redux';
import { store } from 'redux/store';
// import 'tailwindcss/tailwind.css';
import 'styles/globals.scss';
/* Swiper */
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'styles/row-swiper.scss';
/* Components */
import NavBar from 'components/navbar';
import Modal from 'components/modal';
import ModalVideo from 'components/modal/modal-video';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {true && (
        <>
          <NavBar />
          <Modal />
          <ModalVideo />
        </>
      )}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
