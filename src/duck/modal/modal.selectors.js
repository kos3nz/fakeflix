// redux-toolkit には reselect が入ってるのでインストールする必要はありません
import { createSelector } from 'reselect';

const selectModal = (state) => state.modal;

export const selectIsModalOpen = createSelector(
  [selectModal],
  (modal) => modal.isModalOpen
);

export const selectModalContent = createSelector(
  [selectModal],
  (modal) => modal.modalContent
);
