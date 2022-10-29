import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  relatedVideos: [],
  error: null,
};

export const relatedVideosReducer = createReducer(initialState, {
  relatedVideosRequest: state => {
    state.loading = true;
  },
  relatedVideosSuccess: (state, action) => {
    state.loading = false;

    state.relatedVideos = action.payload;
  },
  relatedVideosFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
