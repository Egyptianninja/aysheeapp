import * as React from 'react';
import { Image, View } from 'react-native';
import { images } from '../../load';
const Logo = ({ size = 150 }) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 500
    }}
  >
    <View
      style={{
        width: size,
        height: size,
        opacity: 0.8
      }}
    >
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%'
        }}
        source={images.namelogofull}
      />
    </View>
  </View>
);

export default Logo;
