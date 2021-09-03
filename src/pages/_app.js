import { Provider } from 'react-redux';
import { store } from 'redux/store';
import NextProgress from 'nextjs-progressbar';
// import 'tailwindcss/tailwind.css';
import 'styles/globals.scss';
import UserContextProviderWithRedux from 'components/user-context-provider';
/* Swiper */
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'styles/row-swiper.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserContextProviderWithRedux />
      <NextProgress height={0} color="hsl(0 72% 51%)" />
      {/* #E7020A */}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
