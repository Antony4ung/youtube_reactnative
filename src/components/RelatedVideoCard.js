import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import AutoHeightImage from 'react-native-auto-height-image';
import moment from 'moment';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Divider} from 'react-native-paper';

const {width} = Dimensions.get('screen');

const RelatedVideoCard = ({item, handleSnapPress1, itemCount}) => {
  const {colors} = useTheme();

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleSnapPress1();
        }}
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <AutoHeightImage
          width={width / 2.5}
          source={{uri: item?.snippet?.thumbnails.medium.url}}
        />
        <View style={{width: width / 1.9}}>
          <Text style={{color: colors.text, fontSize: 14}}>
            {item?.snippet.title}
          </Text>
          <Text>{item?.snippet.channelTitle}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: colors.text, fontSize: 12}}>
              {moment(item?.snippet.publishedAt).fromNow()} .
            </Text>
            {itemCount && (
              <Text style={{fontSize: 12}}>{itemCount} videos </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <Divider style={{marginVertical: 7}} />
    </>
  );
};

export default memo(RelatedVideoCard);
