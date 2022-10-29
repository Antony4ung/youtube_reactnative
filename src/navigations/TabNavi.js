import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Create, Home, Library, Shorts, Subscriptions} from '../screens';
import {Icon} from '../components';
import {Icons} from '../components/Icons';
import {useTheme} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavi = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 0,
        },
        // tabBarLabelStyle:{color:colors.text},
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              type={Icons.Ionicons}
              name={focused ? 'ios-home' : 'ios-home-outline'}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          showLabel: false,
          tabBarIcon: ({focused}) => (
            <Icon
              type={Icons.Ionicons}
              name={focused ? 'play' : 'play-outline'}
            />
          ),
        }}
        name="Shorts"
        component={Shorts}
      />
      <Tab.Screen
        name="Create"
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              type={Icons.AntDesign}
              name={focused ? 'pluscircle' : 'pluscircleo'}
            />
          ),
        }}
        component={Create}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              type={Icons.Ionicons}
              name={focused ? 'albums' : 'albums-outline'}
            />
          ),
        }}
        name="Subscriptions"
        component={Subscriptions}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              type={Icons.Ionicons}
              name={focused ? 'ios-download' : 'ios-download-outline'}
            />
          ),
        }}
        name="Library"
        component={Library}
      />
    </Tab.Navigator>
  );
};

export default TabNavi;
