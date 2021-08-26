import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import modalReducer from 'redux/modal/modal.slice';
import modalVideoReducer from 'redux/modal-video/modal-video.slice';
import searchReducer from 'redux/search/search.slice';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    modalVideo: modalVideoReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

/*
If you need to customize the store setup, you can pass additional options. Here's what the hot reloading example might look like using Redux Toolkit:

import { configureStore } from '@reduxjs/toolkit'

import monitorReducersEnhancer from './enhancers/monitorReducers'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loggerMiddleware),
    preloadedState,
    enhancers: [monitorReducersEnhancer],
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}
*/
