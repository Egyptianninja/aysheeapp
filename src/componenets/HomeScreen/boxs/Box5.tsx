import * as React from 'react';
import { View, Dimensions } from 'react-native';
import BoxHeader from './BoxHeader';
const { width } = Dimensions.get('window');
import Photos2 from './Photos2';
import Photos3 from './Photos3';
const Box5 = ({ title, body }: any) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 5
      }}
    >
      <BoxHeader width={width} title={title} body={body} />

      <Photos3 />
      <View style={{ paddingTop: 10 }} />
      <Photos2 />
    </View>
  );
};

export default Box5;
