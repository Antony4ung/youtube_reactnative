import instance from './axiosInstance';

export const fetchChannelDetails = async id => {
  const {data} = await instance('/channels', {
    params: {
      part: 'snippet,statistics,contentDetails',
      id,
    },
  });
  if (!data) {
    return null;
  }

  return data?.items[0];
};
