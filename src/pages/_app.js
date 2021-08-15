import { Provider } from 'react-redux';
import { store } from 'duck/store';
// import 'tailwindcss/tailwind.css';
import 'styles/globals.scss';
/* Swiper */
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'styles/row-swiper.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
