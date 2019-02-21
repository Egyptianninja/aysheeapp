import * as React from 'react';
import { DotIndicator } from '../../../utils';
import { View } from 'react-native';
const LoadingView = ({ width, height }: any) => (
  <View
    style={{
      position: 'absolute',
      top: height / 2 - 15,
      left: width / 2 - 30,
      zIndex: 100
    }}
  >
    <DotIndicator
      count={3}
      size={10}
      colors={['#7678ED', '#00B77C', '#E85255']}
    />
  </View>
);

export default LoadingView;
