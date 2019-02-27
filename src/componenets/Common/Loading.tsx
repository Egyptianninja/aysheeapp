import * as React from 'react';
import { View } from 'react-native';
import { DotIndicator } from '../../utils';

const Loading = () => (
  <View
    style={{
      position: 'absolute',
      top: -100,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: '#fff'
    }}
  >
    <DotIndicator
      count={3}
      size={10}
      colors={['#7678ED', '#00B77C', '#E85255']}
    />
  </View>
);

export default Loading;
