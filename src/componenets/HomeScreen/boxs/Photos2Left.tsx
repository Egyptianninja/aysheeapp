import * as React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { images } from '../../../load';
const { width } = Dimensions.get('window');
const Photos2Left = () => {
  const leftImagewidth = (width - 30) * 0.625;
  const leftImageHeight = leftImagewidth * 0.383;
  const rightImagewidth = width - 30 - leftImagewidth;
  const rightImageHeight = leftImageHeight;

  return (
    <View
      style={{
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <View
        style={{
          width: leftImagewidth,
          height: leftImageHeight
        }}
      >
        <Image
          style={{
            flex: 1,
            width: undefined,
            height: undefined
          }}
          source={images.mainpageoffers}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 30,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: leftImagewidth,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#fff' }}>OFFERS</Text>
        </View>
      </View>
      <View
        style={{
          width: rightImagewidth,
          height: rightImageHeight
        }}
      >
        <Image
          style={{
            flex: 1,
            width: undefined,
            height: undefined
          }}
          source={images.mainpageshops}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            height: 30,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: rightImagewidth,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#fff' }}>SHOPS</Text>
        </View>
      </View>
    </View>
  );
};

export default Photos2Left;
