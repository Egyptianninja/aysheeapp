import * as React from 'react';
import { View } from 'react-native';
import { DotIndicator } from '../../../utils';
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
      size={7}
      colors={['#7678ED', '#00B77C', '#E85255']}
    />
  </View>
);

export default LoadingView;
