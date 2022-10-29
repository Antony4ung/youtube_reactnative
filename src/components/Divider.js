import {View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const Divider = () => {
  const {colors} = useTheme();

  return (
    <View style={{height: 0.5, backgroundColor: colors.text, opacity: 0.3}} />
  );
};

export default Divider;
