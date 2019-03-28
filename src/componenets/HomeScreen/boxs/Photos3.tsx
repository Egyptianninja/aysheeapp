import * as React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { images } from '../../../load';
const { width } = Dimensions.get('window');
const Photos3 = () => {
  const mainImageWidth = (width - 30) * (2 / 3);
  const mainImageHeight = mainImageWidth * (3 / 5);
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
          width: mainImageWidth,
          height: mainImageHeight
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
            width: mainImageWidth,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#fff' }}>OFFERS</Text>
        </View>
      </View>

      <View style={{ justifyContent: 'space-between' }}>
        <View
          style={{
            width: mainImageWidth / 2,
            height: mainImageHeight / 2 - 5
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
              width: mainImageWidth / 2,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ color: '#fff' }}>SHOPS</Text>
          </View>
        </View>
        <View
          style={{
            width: mainImageWidth / 2,
            height: mainImageHeight / 2 - 5
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
              width: mainImageWidth / 2,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ color: '#fff' }}>SHOPS</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Photos3;
