import * as React from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { images } from '../../../load';
const { width } = Dimensions.get('window');
const Photos2 = ({ navigation }: any) => {
  const imagewidth = width / 2 - 20;
  const imageHeight = imagewidth / 2;
  return (
    <View
      style={{
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 3,
        paddingHorizontal: 3.5,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
      }}
    >
      <TouchableOpacity
        onPress={async () => {
          navigation.navigate('OffersScreen');
        }}
        style={{
          width: imagewidth,
          height: imageHeight,
          borderRadius: imageHeight / 2,
          overflow: 'hidden'
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
            height: imageHeight / 2,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: imagewidth,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>OFFERS</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('ShopsScreen')}
        style={{
          width: imagewidth,
          height: imageHeight,

          borderRadius: imageHeight / 2,
          overflow: 'hidden'
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
            height: imageHeight / 2,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            width: imagewidth,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18 }}>SHOPS</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Photos2;
