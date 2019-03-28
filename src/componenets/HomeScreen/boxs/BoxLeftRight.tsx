import * as React from 'react';
import { View, Dimensions } from 'react-native';
import BoxHeader from './BoxHeader';
import Photos2Left from './Photos2Left';
import Photos2Right from './Photos2Right';
const { width } = Dimensions.get('window');
const BoxLeftRight = ({ title, body }: any) => {
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

      <Photos2Right />
      <View style={{ paddingTop: 10 }} />

      <Photos2Left />
    </View>
  );
};

export default BoxLeftRight;
