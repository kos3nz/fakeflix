import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import logger from 'redux-logger';
import modalReducer from 'redux/modal/modal.slice';
import modalVideoReducer from 'redux/modalVideo/modalVideo.slice';
import searchReducer from 'redux/search/search.slice';
import userReducer from 'redux/user/user.slice';

const middlewares: Middleware[] = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const rootReducer = combineReducers({
  modal: modalReducer,
  modalVideo: modalVideoReducer,
  search: searchReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
