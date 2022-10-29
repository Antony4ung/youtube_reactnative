import axios from 'axios';
import {BASE_URL} from '@env';
const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: 'AIzaSyCxm8OMBGbTnm4w9ugqYqNPts_TwYs5A00',
  },
});


export default instance;
