import * as React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

export const PostImage = ({ uri, width, height }: any) => {
  const preview = {
    uri:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcM2VWPQAF6QJLM6nfcQAAAABJRU5ErkJggg=='
  };
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
