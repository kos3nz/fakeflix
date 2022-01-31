import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selectModalVideo = (state: RootState) => state.modalVideo;

export const selectIsModalVideoOpen = createSelector(
  [selectModalVideo],
  (modalVideo) => modalVideo.isModalVideoOpen
);

export const selectVideoKey = createSelector(
  [selectModalVideo],
  (modalVideo) => modalVideo.videoKey
);
