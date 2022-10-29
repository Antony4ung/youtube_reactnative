import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  channelVideos: [],
  error: null,
  nextPageToken: null,
};

export const channelVideosReducer = createReducer(initialState, {
  channelVideoRequest: state => {
    state.loading = true;
  },
  channelVideoSuccess: (state, action) => {
    state.loading = false;
    state.nextPageToken = action.payload.nextPageToken;

    state.channelVideos = action.payload.videos;
  },
  channelVideosFail: (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
  },
});
