import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import NextProgress from 'nextjs-progressbar';
import UserContextProviderWithRedux from 'components/UserContextProvider';
import { ScrollLock } from 'components/ScrollLock';
import { store } from 'redux/store';
/* Styles */
import 'styles/global.scss';
import 'styles/intro-animation.scss';
import 'styles/text-animation.scss';
import 'styles/row-swiper.scss';
/* Swiper Styles */
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UserContextProviderWithRedux />
      <ScrollLock />
      <NextProgress
        height={5}
        color="hsl(0 72% 51%)"
        startPosition={0.2}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
