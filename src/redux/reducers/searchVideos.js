import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  searchVideos: [],
  error: null,
  nextPageToken: null,
  activeCategory: 'All',
};

export const searchVideosReducer = createReducer(initialState, {
  searchVideoRequest: state => {
    state.loading = true;
  },
  searchVideoSuccess: (state, action) => {
    state.loading = false;
    state.nextPageToken = action.payload.nextPageToken;

    state.searchVideos = [...state.searchVideos, ...action.payload.videos];
    state.searchVideos = action.payload.videos;
  },
  searchVideosFail: (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
  },
});
