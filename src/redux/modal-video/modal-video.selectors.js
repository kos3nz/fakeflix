import { createSelector } from 'reselect';

const selectModalVideo = (state) => state.modalVideo;

export const selectIsModalVideoOpen = createSelector(
  [selectModalVideo],
  (modalVideo) => modalVideo.isModalVideoOpen
);

export const selectVideoKey = createSelector(
  [selectModalVideo],
  (modalVideo) => modalVideo.videoKey
);
