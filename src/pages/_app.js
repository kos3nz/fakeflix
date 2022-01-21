import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NextProgress from 'nextjs-progressbar';
import { store, persistor } from 'redux/store';
import UserContextProviderWithRedux from 'components/user-context-provider';
import ScrollLock from 'components/scroll-lock';
// import 'tailwindcss/tailwind.css';
import 'styles/global.scss';
import 'styles/intro-animation.scss';
import 'styles/text-animation.scss';
import 'styles/row-swiper.scss';
/* Swiper */
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <UserContextProviderWithRedux />
        <ScrollLock />
        <NextProgress height={4} color="hsl(0 72% 51%)" />
        {/* #E7020A */}
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
