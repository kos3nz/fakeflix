import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import modalReducer from 'redux/modal/modal.slice';
import modalVideoReducer from 'redux/modalVideo/modalVideo.slice';
import searchReducer from 'redux/search/search.slice';
import userReducer from 'redux/user/user.slice';
import favoritesReducer from 'redux/favorites/favorites.slice';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const rootReducer = combineReducers({
  modal: modalReducer,
  modalVideo: modalVideoReducer,
  search: searchReducer,
  user: userReducer,
  favorites: favoritesReducer,
});

const persistConfig = {
  key: 'root',
  storage, // store values in Local storage
  whitelist: ['favorites'], // only favorites will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
