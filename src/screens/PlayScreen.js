import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  DescriptionSheet,
  Icon,
  RelatedVideoCard,
  VideoPlayer,
} from '../components';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {Icons} from '../components/Icons';
import {useNavigation, useTheme} from '@react-navigation/native';
import numeral from 'numeral';
import moment from 'moment';
import {Divider} from 'react-native-paper';
import {playerOptionBar} from '../data';
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {
  getRelatedVideos,
  getVideoById,
} from '../redux/actions/homeVideosAction';
import instance from '../utils/axiosInstance';

const {width} = Dimensions.get('screen');

const PlayScreen = ({route}) => {
  const {videoId, channelId} = route.params;

  const navigation = useNavigation();

  const {colors} = useTheme();

  const sheet1Ref = useRef(null);
  const sheet2Ref = useRef(null);

  const snapPoints2 = ['70%'];
  const snapPoints1 = ['35%', '100%'];

  const dispatch = useDispatch();

  const [channelData, setChannelData] = useState(null);

  useEffect(() => {
    const get_channel_data = async () => {
      const {
        data: {items},
      } = await instance('/channels', {
        params: {
          part: 'snippet,statistics',
          id: channelId,
        },
      });
      setChannelData({
        id: items[0]?.id,
        icon: items[0]?.snippet.thumbnails.default.url,
        subscribers: items[0]?.statistics?.subscriberCount,
        channelTitle: items[0]?.snippet?.title,
      });
    };
    get_channel_data();
  }, [channelId]);

  // const {channelData} = useSelector(state => state.channelReducer);
  const {currentVideo} = useSelector(state => state.currentVideoReducer);
  const {relatedVideos} = useSelector(state => state.relatedVideosReducer);

  useEffect(() => {
    dispatch(getVideoById(videoId));
    dispatch(getRelatedVideos(videoId));
  }, [videoId, dispatch]);

  const handleSnapPress1 = useCallback(index => {
    sheet1Ref.current?.snapToIndex(index);
  }, []);

  const handleSnapPress2 = useCallback(index => {
    sheet2Ref.current?.snapToIndex(index);
  }, []);

  // useEffect(()=>{
  //   console.log(channelData)
  // },[channelData])

  if (!currentVideo && !channelData && !relatedVideos) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <VideoPlayer
        thumbnailImg={currentVideo?.snippet?.thumbnails.high.url}
        videoId={videoId}
      />

      <TouchableOpacity
        onPress={() => handleSnapPress2(0)}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
        }}>
        <View style={{width: width * 0.8}}>
          <Text style={{color: colors.text}}>
            {currentVideo?.snippet?.title}
          </Text>
        </View>
        <Icon
          type={Icons.AntDesign}
          size={20}
          name={'down'}
          color={colors.text}
        />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          marginHorizontal: 15,
        }}>
        {currentVideo?.statistics?.viewCount && (
          <Text
            style={{
              fontSize: 12,
              marginTop: 3,
              color: colors.text,
              opacity: 0.6,
            }}>
            {numeral(currentVideo?.statistics?.viewCount).format('0.a')} Views .{' '}
            {moment(currentVideo?.snippet.publishedAt).fromNow()}
          </Text>
        )}
      </View>

      <View style={{marginVertical: 15}}>
        <FlatList
          style={{marginHorizontal: 10}}
          data={playerOptionBar}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{alignItems: 'center', marginHorizontal: 15}}
              key={item.id}>
              <Icon type={item.type} name={item.name} />
              <Text style={{marginTop: 2, fontSize: 10}}>
                {item.label === 'like' && currentVideo?.statistics?.likeCount
                  ? numeral(currentVideo?.statistics?.likeCount).format('0.a')
                  : item.label}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>

      <Divider style={{}} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Channel', {id: channelData?.id})}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          {channelData?.icon ? (
            <Image
              source={{uri: channelData?.icon}}
              style={{width: 40, height: 40, borderRadius: 50, margin: 10}}
            />
          ) : (
            <Image
              source={require('../images/profile.jpg')}
              style={{width: 40, height: 40, borderRadius: 50, margin: 10}}
            />
          )}
          <View style={{maxWidth: width * 0.7}}>
            <Text style={{fontSize: 15, fontWeight: '700'}}>
              {channelData?.channelTitle}
            </Text>
            <Text>
              {numeral(channelData?.subscribers).format('0.a')} subscribers
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{}}>
          <Text style={{color: colors.notification, fontSize: 16}}>
            SUBSCRIBE
          </Text>
        </TouchableOpacity>
      </View>

      <Divider style={{marginVertical: 5}} />

      {/* related videos sheet */}

      <BottomSheet
        // enablePanDownToClose={true}
        backgroundStyle={{backgroundColor: colors.background}}
        index={0}
        snapPoints={snapPoints1}
        ref={sheet1Ref}>
        <BottomSheetFlatList
          style={{paddingTop: 10}}
          data={relatedVideos}
          keyExtractor={() => uuid.v4()}
          initialNumToRender={5}
          renderItem={({item}) => (
            <RelatedVideoCard
              handleSnapPress1={() => {
                navigation.navigate('PlayScreen', {
                  videoId: item?.id.videoId || item?.id,
                  channelId: item?.snippet?.channelId,
                });
              }}
              item={item}
            />
          )}
          contentContainerStyle={{}}
        />
      </BottomSheet>

      {/* videoDetails sheet */}

      <BottomSheet
        enablePanDownToClose={true}
        backgroundStyle={{backgroundColor: colors.background}}
        index={-1}
        snapPoints={snapPoints2}
        ref={sheet2Ref}>
        <BottomSheetView>
          <DescriptionSheet
            videoData={currentVideo}
            channelData={channelData}
            close={() => sheet2Ref.current?.close()}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default PlayScreen;
