import {View, ActivityIndicator, Dimensions} from 'react-native';
import React from 'react';

const {height} = Dimensions.get('screen');

const RenderLoader = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
      }}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};
export default RenderLoader;
