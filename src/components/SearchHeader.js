import {View, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import React from 'react';
import Icon, {Icons} from './Icons';
import {useNavigation, useTheme} from '@react-navigation/native';

const {width} = Dimensions.get('screen');

const SearchHeader = ({onSearch}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  return (
    <View></View>
  );
};

export default SearchHeader;
