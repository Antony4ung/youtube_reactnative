import {configureStore} from '@reduxjs/toolkit';
import {channelReducer} from './reducers/channelReducer';
import {channelVideosReducer} from './reducers/channelVideosReducer';
import {currentVideoReducer} from './reducers/currentVideoReducer';
import {homeVideosReducer} from './reducers/homeVideosReducer';
import {relatedVideosReducer} from './reducers/relatedVideoReducer';
import {searchVideosReducer} from './reducers/searchVideos';

const store = configureStore({
  reducer: {
    homeVideosReducer: homeVideosReducer,
    channelReducer: channelReducer,
    currentVideoReducer: currentVideoReducer,
    relatedVideosReducer: relatedVideosReducer,
    searchVideosReducer: searchVideosReducer,
    channelVideosReducer: channelVideosReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export default store;
