import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  currentVideo: [],
  error: null,
};

export const currentVideoReducer = createReducer(initialState, {
  currentVideoRequest: state => {
    state.loading = true;
  },
  currentVideoSuccess: (state, action) => {
    state.loading = false;

    state.currentVideo = action.payload;
  },
  currentVideoFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
