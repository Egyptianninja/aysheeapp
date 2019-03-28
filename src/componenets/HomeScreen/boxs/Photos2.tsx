import * as React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { images } from '../../../load';
const { width } = Dimensions.get('window');
const Photos2 = () => {
  const imagewidth = width / 2 - 15;
  const imageHeight = imagewidth / 2;
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
          width: imagewidth,
          height: imageHeight
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
            width: imagewidth,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#fff' }}>OFFERS</Text>
        </View>
      </View>
      <View
        style={{
          width: imagewidth,
          height: imageHeight
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
            width: imagewidth,
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

export default Photos2;
