import * as React from 'react';
import { View, Image } from 'react-native';
import { images } from '../../load';
const Logo = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 100
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
);

export default Logo;
