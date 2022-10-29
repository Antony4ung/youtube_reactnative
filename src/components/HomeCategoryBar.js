import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {homeCategoryBarData} from '../data';
import {useTheme} from '@react-navigation/native';
import Icon, {Icons} from './Icons';
import {Chip} from 'react-native-paper';

const HomeCategoryBar = ({activeCategory, setActiveCategory}) => {
  const {colors} = useTheme();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{marginVertical: 10}}>
      <Chip style={{marginRight: 7}} onPress={() => console.log('Pressed')}>
        <View>
          <Icon type={Icons.AntDesign} size={18} name="find" />
        </View>
      </Chip>
      {homeCategoryBarData.map(item => (
        <Chip
          key={item.id}
          mode={activeCategory === item.title ? 'flat' : 'outlined'}
          style={{marginRight: 7}}
          selectedColor={colors.primary}
          onPress={() => setActiveCategory(item.title)}>
          {item.title}
        </Chip>
      ))}
    </ScrollView>
  );
};

export default HomeCategoryBar;
