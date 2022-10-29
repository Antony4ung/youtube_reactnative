import {useColorScheme} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './HomeStack';


const AppContainer = () => {
  const color = useColorScheme();

  const MyTheme = {
    dark: color === 'dark',
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: color === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(242, 242, 242)',
      card: color === 'dark' ? '#181818' : 'rgb(255, 255, 255)',
      text: color === 'dark' ? 'rgb(242, 242, 242)' : 'rgb(0, 0, 0)',
      notification: 'rgb(255, 69, 58)',
      link:'#00009f',
    },
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <HomeStack/>
    </NavigationContainer>
  );
};

export default AppContainer;
