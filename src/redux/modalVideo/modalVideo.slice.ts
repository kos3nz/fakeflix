import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalVideoState {
  isModalVideoOpen: boolean;
  videoKey: string;
}

const initialState: ModalVideoState = {
  isModalVideoOpen: false,
  videoKey: '',
};

export const modalVideoSlice = createSlice({
  name: 'modal-video',
  initialState,
  reducers: {
    openModalVideo: (state, action: PayloadAction<string>) => {
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
