import * as React from 'react';
import { View, Dimensions } from 'react-native';
import BoxHeader from './BoxHeader';
import Photos4 from './Photos4';
const { width } = Dimensions.get('window');
const Box4 = ({ title, body }: any) => {
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

      <Photos4 />
    </View>
  );
};

export default Box4;
