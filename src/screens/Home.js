import {
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HomeBar, HomeCategoryBar, RenderLoader} from '../components';
import HomeVideoCard from '../components/HomeVideoCard';
import {useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  getPopularVideos,
  getVideosByCategory,
} from '../redux/actions/homeVideosAction.js';
import {useSelector} from 'react-redux';

const {height} = Dimensions.get('screen');



const Home = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const {colors} = useTheme();

  const dispatch = useDispatch();

  const {homeVideos, loading} = useSelector(state => state.homeVideosReducer);

  const fetchData = () => {
    if (activeCategory === 'All') {
      dispatch(getPopularVideos());
    } else {
      dispatch(getVideosByCategory(activeCategory));
    }
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  return (
    <View>
      <HomeBar />

      {/* <ScrollView
        showsVerticalScrollIndicator={false}> */}
      <HomeCategoryBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {homeVideos ? (
        <FlatList
          onEndReached={fetchData}
          onEndReachedThreshold={0}
          ListFooterComponent={RenderLoader}
          style={{marginBottom: 100,marginTop:10}}
          data={homeVideos}
          initialNumToRender={5}
          renderItem={({item, index}) => (
            <HomeVideoCard
              key={index}
              video={item}
              videoId={activeCategory === 'All' ? item?.id : item?.id?.videoId}
              colors={colors}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <View
          style={{
            flex: 1,
            height: height,
          }}>
          <RenderLoader />
        </View>
      )}
      {/* </ScrollView> */}
    </View>
  );
};

export default Home;
