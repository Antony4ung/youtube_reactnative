import {Dimensions, TextInput, TouchableOpacity, View,Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Icon, RelatedVideoCard, RenderLoader} from '../components';
import {Icons} from '../components/Icons';
import {useDispatch, useSelector} from 'react-redux';
import {getVideosBySearch} from '../redux/actions/homeVideosAction';
import uuid from 'react-native-uuid';
import instance from '../utils/axiosInstance';



const {width} = Dimensions.get('screen');

const Search = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();

  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const searchChannel = async q =>{
    try {
      const {data} = await instance('/search', {
        params: {
          part: 'snippet',
          q: q,
          maxResults: 20,
          order: 'relevance',
          type: 'channel',
        },
      });

      console.log(data?.items?.id)

      // setChannel(data?.items)

    } catch (error) {
      console.log(error)
    }
  }

  const onSearch = query => {
    // console.log('search starting' + 'query =>' + query)
    dispatch(getVideosBySearch(query));
    searchChannel(query);
  };

  const {searchVideos} = useSelector(state=>state.searchVideosReducer);
  

  
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          // backgroundColor: 'red',
          alignItems: 'center',
          paddingVertical: 10
        }}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() => navigation.goBack()}>
          <Icon
            type={Icons.MaterialIcons}
            name={'arrow-back-ios'}
            color={colors.text}
          />
        </TouchableOpacity>
        <View style={{width: width * 0.8}}>
          <TextInput
            value={input}
            onChangeText={e => setInput(e)}
            style={{
              height: 40,
              backgroundColor: colors.card,
              width: '100%',
              borderRadius: 5,
              paddingLeft: 20,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => onSearch(input)}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Icon type={Icons.AntDesign} name={'search1'} color={colors.text} />
        </TouchableOpacity>
      </View>

      {searchVideos.length >= 1  &&
        <View style={{marginTop:20}}>
          <Text style={{marginBottom:10,marginHorizontal:10,fontSize:20,fontWeight:'bold',fontStyle:'italic'}}>Search results</Text>
          <FlatList
          onEndReached={()=>onSearch(input)}
          onEndReachedThreshold={0}
          ListFooterComponent={RenderLoader}
          style={{paddingTop: 10,marginBottom:100}}
          data={searchVideos}
          keyExtractor={() => uuid.v4()}
          initialNumToRender={10}
          renderItem={({item}) => (
            <RelatedVideoCard
              handleSnapPress1={() => {
                navigation.navigate('PlayScreen', {videoId:item?.id?.videoId,channelId:item?.snippet.channelId});
              }}
              item={item}
            />
          )}
          contentContainerStyle={{}}
        />
        </View>
      }
    </View>
  );
};

export default Search;
