import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon, {Icons} from './Icons';
import {useNavigation, useTheme} from '@react-navigation/native';

const ChannelHeader = ({channelName}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          type={Icons.MaterialIcons}
          name={'arrow-back-ios'}
          color={colors.text}
        />
        <Text style={{fontSize: 17, color: colors.text}}>{channelName}</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{marginHorizontal: 15}} onPress={() => navigation.navigate('Search')}>
          <Icon type={Icons.MaterialIcons} name="search" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('')}
          >
          <Icon type={Icons.Feather} name="more-vertical" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChannelHeader;
