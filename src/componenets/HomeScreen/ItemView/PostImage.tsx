import * as React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { preview } from '../../../constants';
export const PostImage = ({ uri, width, height }: any) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: width - 2,
          height,
          overflow: 'hidden',
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7
        }}
      >
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover'
          }}
          resizeMethod="resize"
          {...{ preview, uri }}
        />
      </View>
    </View>
  );
};
