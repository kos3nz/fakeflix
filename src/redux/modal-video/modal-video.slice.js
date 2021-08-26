import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalVideoOpen: false,
  videoKey: '',
};

export const modalVideoSlice = createSlice({
  name: 'modal-video',
  initialState,
  reducers: {
    openModalVideo: (state, action) => {
      state.isModalVideoOpen = true;
      state.videoKey = action.payload;
    },
    closeModalVideo: (state) => {
      state.isModalVideoOpen = false;
      state.videoKey = '';
    },
  },
});

export const { openModalVideo, closeModalVideo } = modalVideoSlice.actions;

export default modalVideoSlice.reducer;
