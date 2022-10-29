import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {ChannelHeader, RelatedVideoCard} from '../components';
import {useDispatch, useSelector} from 'react-redux';
import {getChannelDetails} from '../redux/actions/channelAction';
import {useNavigation, useTheme} from '@react-navigation/native';
import numeral from 'numeral';
import {getChannelVIdeos} from '../redux/actions/homeVideosAction';
import BottomSheet, {
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import uuid from 'react-native-uuid';
const Channel = ({route}) => {
  const dispatch = useDispatch();

  const {id} = route.params;

  const {colors} = useTheme();

  useEffect(() => {
    dispatch(getChannelDetails(id));
    dispatch(getChannelVIdeos(id));
  }, [id, dispatch]);

  const {channelData} = useSelector(state => state.channelReducer);
  const {channelVideos} = useSelector(state => state.channelVideosReducer);

  const snapPoints1 = ['63%', '100%'];
  const sheet1Ref = useRef(null);

  const navigation = useNavigation();

  if (!channelData && !channelVideos) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ChannelHeader channelName={channelData?.snippet?.title} />

      <View style={{alignItems: 'center', marginVertical: 10}}>
        <Image
          style={{width: 70, height: 70, borderRadius: 50}}
          source={{uri: channelData?.snippet?.thumbnails?.default.url}}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>
          {channelData?.snippet?.title}
        </Text>
        <TouchableOpacity style={{marginVertical: 5}}>
          <Text style={{color: colors.primary}}>SUBSCRIBE</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 14, marginVertical: 5}}>
          {numeral(channelData?.statistics?.subscriberCount).format('0.a')}{' '}
          subscribers .{' '}
          {numeral(channelData?.statistics?.videoCount).format('0.a')} videos
        </Text>
      </View>

      <View style={{padding: 10, flex: 1}}>
        <Text
          style={{
            marginBottom: 10,
            fontSize: 17,
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>
          {'Uploaded playlists'}
        </Text>
      </View>

      <BottomSheet
        // enablePanDownToClose={true}
        backgroundStyle={{backgroundColor: colors.background}}
        index={0}
        snapPoints={snapPoints1}
        ref={sheet1Ref}>
        <BottomSheetFlatList
          style={{paddingTop: 10}}
          data={channelVideos}
          keyExtractor={() => uuid.v4()}
          initialNumToRender={5}
          renderItem={({item}) => (
            <RelatedVideoCard
              handleSnapPress1={() => {
                navigation.navigate('PlayList', {
                // videoId: item?.id.videoId || item?.id,
                // channelId: item?.snippet?.channelId,
                playListId:item?.id,
                channelTitle:item?.snippet?.channelTitle,
                playListTitle:item?.snippet?.title,
                videoCount:item?.contentDetails?.itemCount,
              });
              }}
              item={item}
              itemCount={item?.contentDetails.itemCount}
            />
          )}
          contentContainerStyle={{}}
        />
      </BottomSheet>
    </View>
  );
};

export default Channel;
