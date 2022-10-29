import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import Icon, {Icons} from './Icons';
import instance from '../utils/axiosInstance';
import moment from 'moment';
import numeral from 'numeral';
import {useNavigation} from '@react-navigation/native';
const {width} = Dimensions.get('screen');

const HomeVideoCard = ({video, videoId, colors}) => {
  const channelID = video.snippet.channelId;
  const [channelIcon, setChannelIcon] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const get_channel_icon = async () => {
      const {
        data: {items},
      } = await instance('/channels', {
        params: {
          part: 'snippet',
          id: channelID,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default.url);
    };
    get_channel_icon();
  }, [channelID]);

  return (
    <Pressable
      onPress={() => navigation.navigate('PlayScreen', {videoId,channelId:video?.snippet.channelId})}
      style={{paddingBottom: 10}}>
      <AutoHeightImage
        width={width}
        source={{
          uri: video?.snippet?.thumbnails.medium.url,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center',paddingVertical:10}}>
          {channelIcon ? (
            <Image
              source={{uri: channelIcon}}
              style={{width: 40, height: 40, borderRadius: 50, margin: 10}}
            />
          ) : (
            <Image
              source={require('../images/profile.jpg')}
              style={{width: 40, height: 40, borderRadius: 50, margin: 10}}
            />
          )}
          <View style={{width: width * 0.7}}>
            <Text style={{fontSize: 14, color: colors.text}}>
              {video?.snippet.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                marginTop: 3,
                color: colors.text,
                opacity: 0.6,
              }}>
              {video?.snippet.channelTitle} .{' '}
              {video?.statistics?.viewCount &&
                numeral(video?.statistics?.viewCount).format('0.a') + 'Views .'}
              {moment(video?.snippet.publishedAt).fromNow()}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={{marginRight: 10}}>
          <Icon type={Icons.Feather} name={'more-vertical'} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default memo(HomeVideoCard);
