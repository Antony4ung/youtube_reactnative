import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon, RelatedVideoCard, RenderLoader} from '../components';
import {Icons} from '../components/Icons';
import {Button} from 'react-native-paper';
import {useNavigation, useTheme} from '@react-navigation/native';
import instance from '../utils/axiosInstance';
import uuid from 'react-native-uuid';
const PlayList = ({route}) => {
  const {playListId, channelTitle, playListTitle, videoCount} = route.params;
  const {colors} = useTheme();

  const [playListData, setPlayListData] = useState(null);

  const getPlayListVideos = async id => {
    try {
      const {data} = await instance('/playlistItems', {
        params: {
          part: 'snippet,status,contentDetails',
          maxResults: 20,
          playlistId: id,
        },
      });
      setPlayListData(data.items);
    } catch (error) {
      console.log(error);
    }
  };
  const navigation = useNavigation();
  useEffect(() => {
    getPlayListVideos(playListId);
  }, [playListId]);

  if (!playListData) {
    return <RenderLoader />;
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          marginLeft: 20,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Icon type={Icons.MaterialIcons} name="arrow-back-ios" />
        <Text>{channelTitle}</Text>
      </TouchableOpacity>

      <View style={{padding: 20, marginBottom: 10, flexDirection: 'row'}}>
        <Text style={{marginRight: 20}}>{playListTitle}</Text>
        <Text style={{}}>{videoCount} Videos</Text>
      </View>

      {/* <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}}>
        <Icon type={Icons.Feather} name="play"/>
            <Text>play</Text>
        </TouchableOpacity> */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 150,
            backgroundColor: colors.text,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            marginRight: 10,
          }}>
          <Icon
            size={30}
            color={colors.background}
            type={Icons.Entypo}
            name="controller-play"
          />
          <Text style={{color: colors.background}}>{'PLAY'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 150,
            borderColor: colors.text,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Icon size={30} type={Icons.Entypo} name="controller-play" />
          <Text style={{}}>{'SHUFFLE'}</Text>
        </TouchableOpacity>
      </View>

      {playListData && (
        <View style={{}}>
          <FlatList
            style={{paddingTop: 30}}
            data={playListData}
            keyExtractor={() => uuid.v4()}
            initialNumToRender={5}
            renderItem={({item}) => (
              <RelatedVideoCard
                handleSnapPress1={() => {
                  navigation.navigate('PlayScreen', {
                    videoId: item?.contentDetails?.videoId,
                    channelId: item?.snippet?.channelId,
                  });
                }}
                item={item}
              />
            )}
            contentContainerStyle={{}}
          />
        </View>
      )}
    </View>
  );
};

export default PlayList;
