import {View, Alert} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoPlayerr = ({thumbnailImg, videoId}) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  return (
    <View>
      <YoutubePlayer
        height={250}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default VideoPlayerr;
