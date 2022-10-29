import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Icon from './Icons';

const TabBarBtn = ({navigation,routeName,iconName,iconColor,iconType}) => {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate(routeName)} style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Icon type={iconType} name={iconName} color={iconColor}/>
        <Text>{routeName}</Text>
    </TouchableOpacity>
  );
};

export default TabBarBtn;
