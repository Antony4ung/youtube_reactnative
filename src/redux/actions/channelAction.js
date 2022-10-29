import instance from '../../utils/axiosInstance';

export const getChannelDetails = id => async dispatch => {
  try {
    dispatch({
      type: 'channelDataRequest',
    });

    console.log(id)

    const {data} = await instance('/channels', {
      params: {
        part: 'snippet,statistics,contentDetails',
        id,
      },
    });

    console.log(data)

    dispatch({
      type: 'channelDataSuccess',
      payload: '',
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: 'channelDataFail',
      payload: error.message,
    });
  }
};
