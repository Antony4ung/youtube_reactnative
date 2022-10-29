import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon, { Icons } from './Icons';
import { useNavigation, useTheme } from '@react-navigation/native';

const HomeBar = () => {

    const navigation = useNavigation();
    const {colors} = useTheme()

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom:10,
        paddingVertical:5,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../images/youtube.png')}
          style={{width: 30, height: 30}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 20, marginLeft: 5,color:colors.text}}>
          YouTube
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('ScreenShare')} style={{marginHorizontal:7}}>
            <Icon type={Icons.MaterialIcons} name="screen-share"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Notifications')} style={{marginHorizontal:7}}>
            <Icon type={Icons.Feather} name="bell"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Search')} style={{marginHorizontal:7}}>
            <Icon type={Icons.MaterialIcons} name="search"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')} style={{marginHorizontal:7}}>
            <Image source={require('../images/profile.jpg')} style={{width:30,height:30,borderRadius:50}}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeBar;
