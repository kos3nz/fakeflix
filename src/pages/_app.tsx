import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import NextProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import { ScrollLock } from 'components/ScrollLock';
import { AuthUser } from 'components/AuthUser';
import { store, persistor } from 'redux/store';
/* Styles */
import 'styles/global.scss';
import 'styles/intro-animation.scss';
import 'styles/text-animation.scss';
import 'styles/swiper.scss';
/* Swiper Styles */
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthUser />
        <ScrollLock />
        <NextProgress
          height={3}
          color="hsl(0 72% 51%)"
          startPosition={0.2}
          options={{ showSpinner: false }}
        />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(220, 38, 38, 1)',
              color: '#fff',
            },
          }}
        />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
