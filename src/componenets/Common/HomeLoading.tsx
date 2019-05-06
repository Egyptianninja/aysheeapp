import * as React from 'react';
import { View } from 'react-native';
import { DotIndicator } from '../../utils';

const HomeLoading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}
    >
      <DotIndicator
        count={3}
        size={8}
        colors={['#7678ED', '#00B77C', '#E85255']}
      />
    </View>
  );
};

export default HomeLoading;
