import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { TitleData } from 'const/request-url';

interface ModalState {
  isModalOpen: boolean;
  modalContent: TitleData | null;
}

const initialState: ModalState = {
  isModalOpen: false,
  modalContent: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<TitleData>) => {
      state.isModalOpen = true;
      state.modalContent = { ...action.payload };
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
