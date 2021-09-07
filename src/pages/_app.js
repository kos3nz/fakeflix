import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NextProgress from 'nextjs-progressbar';
import { store, persistor } from 'redux/store';
// import 'tailwindcss/tailwind.css';
import UserContextProviderWithRedux from 'components/user-context-provider';
import 'styles/globals.scss';
import 'styles/intro-animation.scss';
import 'styles/text-animation.scss';
import 'styles/row-swiper.scss';
/* Swiper */
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <UserContextProviderWithRedux />
        <NextProgress height={4} color="hsl(0 72% 51%)" />
        {/* #E7020A */}
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
