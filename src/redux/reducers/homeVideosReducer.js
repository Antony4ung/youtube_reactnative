import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  homeVideos: [],
  error: null,
  nextPageToken: null,
  activeCategory: 'All',
};

export const homeVideosReducer = createReducer(initialState, {
  homeVideoRequest: state => {
    state.loading = true;
  },
  homeVideoSuccess: (state, action) => {
    state.loading = false;
    state.nextPageToken = action.payload.nextPageToken;

    if (state.activeCategory === action.payload.category) {
      state.homeVideos = [...state.homeVideos, ...action.payload.videos];
    } else {
      state.homeVideos = action.payload.videos;
    }

    state.activeCategory = action.payload.category;
  },
  homeVideosFail: (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
  },
});
