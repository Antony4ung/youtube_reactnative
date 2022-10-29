import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { Icon} from '../components';
import {Icons} from '../components/Icons';
import {useNavigation, useTheme} from '@react-navigation/native';
import {profile1, profile2, profile3, profile4} from '../data';
import { Divider } from 'react-native-paper';

const Profile = () => {
  const navigation = useNavigation();

  const {colors} = useTheme();

  return (
    <View>
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => navigation.navigate('Home')}>
        <Icon type={Icons.AntDesign} name="close" size={25} />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../images/profile.jpg')}
            style={{width: 50, height: 50, borderRadius: 50, marginRight: 15}}
          />
          <Text style={{fontWeight: '600', fontSize: 16, color: colors.text}}>
            Aung Myat Thu
          </Text>
        </View>
        <TouchableOpacity>
          <Icon type={Icons.MaterialIcons} name="arrow-forward-ios" size={22} />
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity style={{marginRight: 20, marginTop: 5}}>
        <Text style={{color: '#308efd', textAlign: 'right'}}>
          Manage your google account
        </Text>
      </TouchableOpacity>

      <ScrollView style={{marginTop: 30}} showsVerticalScrollIndicator={false}>
        {profile1.map((item, index) => (
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
            key={item.id}>
            <View style={{marginRight: 20}}>
              <Icon type={item.iconType} name={item.name} size={27} />
            </View>
            <Text>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <Divider />
        {profile2.map(item => (
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
            key={item.id}>
            <View style={{marginRight: 20}}>
              <Icon type={item.iconType} name={item.name} size={27} />
            </View>
            <Text>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <Divider />
        {profile3.map((item, index) => (
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
            key={item.id}>
            <View style={{marginRight: 20}}>
              <Icon type={item.iconType} name={item.name} size={27} />
            </View>
            <Text>{item.label}</Text>
          </TouchableOpacity>
        ))}
        <Divider />
        {profile4.map((item, index) => (
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
            key={item.id}>
            <View style={{marginRight: 20}}>{item.icon}</View>
            <Text>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Profile;
