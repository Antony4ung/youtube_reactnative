import instance from '../../utils/axiosInstance';

export const getPopularVideos = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'homeVideoRequest',
    });

    const {data} = await instance('/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'TH',
        maxResults: 20,
        pageToken: getState().homeVideosReducer?.nextPageToken,
      },
    });

    dispatch({
      type: 'homeVideoSuccess',
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: 'All',
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'homeVideosFail',
      payload: error?.message,
    });
  }
};

export const getVideosByCategory = keyword => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'homeVideoRequest',
    });
    const {data} = await instance('/search', {
      params: {
        part: 'snippet',

        maxResults: 20,
        pageToken: getState().homeVideosReducer?.nextPageToken,
        q: keyword,
        type: 'video',
      },
    });

    dispatch({
      type: 'homeVideoSuccess',
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'homeVideosFail',
      payload: error.message,
    });
  }
};

export const getVideoById = id => async dispatch => {
  try {
    dispatch({
      type: 'currentVideoRequest',
    });

    const {data} = await instance('/videos', {
      params: {
        part: 'snippet,statistics',
        id: id,
      },
    });

    dispatch({
      type: 'currentVideoSuccess',
      payload: data.items[0],
    });
  } catch (error) {
    dispatch({
      type: 'currentVideoFail',
      payload: error.message,
    });
  }
};

export const getRelatedVideos = id => async dispatch => {
  try {
    dispatch({
      type: 'relatedVideosRequest',
    });

    console.log(id);

    const {data} = await instance('/search', {
      params: {
        part: 'snippet',
        relatedToVideoId: id,
        maxResults: 30,
        type: 'video',
      },
    });

    // console.log(data);

    dispatch({
      type: 'relatedVideosSuccess',
      payload: data.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: 'relatedVideosFail',
      payload: error.message,
    });
  }
};

export const getVideosBySearch = keyword => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'searchVideoRequest',
    });
    const {data} = await instance('/search', {
      params: {
        part: 'snippet',
        pageToken: getState().searchVideosReducer?.nextPageToken,
        maxResults: 20,
        q: keyword,
        type: 'video,channel',
      },
    });

    // console.log(data.nextPageToken);

    dispatch({
      type: 'searchVideoSuccess',
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'searchVideosFail',
      payload: error.message,
    });
  }
};


export const getChannelVIdeos = keyword => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'channelVideoRequest',
    });
    const {data} = await instance('/playlists', {
      params: {
        part: 'snippet,status,contentDetails',
        pageToken: getState().channelVideosReducer?.nextPageToken,
        maxResults: 3,
        channelId: keyword,
        type: 'video,channel',
      },
    });

    // console.log(data.nextPageToken);

    dispatch({
      type: 'channelVideoSuccess',
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: 'channelVideosFail',
      payload: error.message,
    });
  }
};
