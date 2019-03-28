import * as React from 'react';
import { View, Dimensions } from 'react-native';
import BoxHeader from './BoxHeader';
import Photos2 from './Photos2';
const { width } = Dimensions.get('window');
const MainBox = ({ title, body }: any) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 5
      }}
    >
      <BoxHeader width={width} title={title} body={body} />

      <Photos2 />
    </View>
  );
};

export default MainBox;
