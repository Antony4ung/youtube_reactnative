import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  Notifications, Profile, ScreenShare, Search,PlayScreen, Channel, PlayList } from '../screens';
import TabNavi from './TabNavi';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="TabStack">
        <Stack.Screen name="TabStack" component={TabNavi} />
        <Stack.Screen name="ScreenShare" component={ScreenShare} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PlayScreen" component={PlayScreen} />
        <Stack.Screen name="Channel" component={Channel} />
        <Stack.Screen name="PlayList" component={PlayList} />
      </Stack.Navigator>
  );
};

export default HomeStack;
