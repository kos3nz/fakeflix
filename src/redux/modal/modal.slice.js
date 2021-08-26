import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  modalContent: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalContent = { ...action.payload };
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalContent = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
