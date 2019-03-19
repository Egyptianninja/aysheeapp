import * as React from 'react';
import { View, Image } from 'react-native';
import { images } from '../../load';
const WhitLogo = ({ size = 150 }) => (
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
        source={images.namelogowhite}
      />
    </View>
  </View>
);

export default WhitLogo;
