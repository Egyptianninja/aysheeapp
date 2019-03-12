import * as React from 'react';
import { View, Image } from 'react-native';
import { images } from '../../load';
const Logo = ({ size = 150 }) => (
  <View
    style={{
      backgroundColor: '#fff',
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
          height: '100%',
          tintColor: '#7678ED'
        }}
        source={images.namelogofull}
      />
    </View>
  </View>
);

export default Logo;
