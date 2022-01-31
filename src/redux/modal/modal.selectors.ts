// redux-toolkit には reselect が入ってるのでインストールする必要はなし
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

const selectModal = (state: RootState) => state.modal;

export const selectIsModalOpen = createSelector(
  [selectModal],
  (modal) => modal.isModalOpen
);

export const selectModalContent = createSelector(
  [selectModal],
  (modal) => modal.modalContent
);
