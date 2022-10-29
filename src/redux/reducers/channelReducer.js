import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  channelData: [],
  error: null,
};

export const channelReducer = createReducer(initialState, {
  channelDataRequest: state => {
    state.loading = true;
  },
  channelDataSuccess: (state, action) => {
    state.loading = false;
    state.channelData = action.payload;
  },
  channelDataFail: (state, action) => {
    state.loading = false;
    state.error = action.payload.error;
  },
});
