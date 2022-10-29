import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon, {Icons} from './Icons';
import {useTheme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import numeral from 'numeral';
import moment from 'moment';

const DescriptionSheet = ({close, videoData, channelData}) => {
  const {colors} = useTheme();

  return (
    <View style={{padding: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 10,
          marginBottom: 20,
        }}>
        <View style={{}}>
          <Text style={{color: colors.text, fontSize: 17}}>Description</Text>
        </View>

        <TouchableOpacity onPress={close}>
          <Icon name={'close'} color={colors.text} type={Icons.AntDesign} />
        </TouchableOpacity>
      </View>
      <Divider />
      <View style={{paddingTop: 10}}>
        <Text style={{color: colors.text, fontWeight: '500'}}>
          {videoData?.snippet?.title}
        </Text>
      </View>

      <TouchableOpacity
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 30, height: 30, borderRadius: 30, marginRight: 10}}
          source={{uri: channelData?.snippet?.thumbnails?.default.url}}
        />
        <Text style={{color: colors.text}}>{channelData?.snippet?.title}</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 20,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: colors.text, fontSize: 16}}>
            {numeral(videoData?.statistics?.likeCount).format('0.a')}
          </Text>
          <Text>Likes</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: colors.text, fontSize: 16}}>
            {numeral(videoData?.statistics?.viewCount).format('0.a')}
          </Text>
          <Text>Views</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', color: colors.text, fontSize: 16}}>
            {moment(videoData?.snippet?.publishedAt).format('MMMM Do YYYY')}
          </Text>
          <Text>Date</Text>
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default DescriptionSheet;
