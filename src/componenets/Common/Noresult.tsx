import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { images } from '../../load';
const Noresult = ({ title, isRTL, top, bgColor }: any) => (
  <View
    style={{
      flex: 1,
      marginTop: top ? top + 20 : 20,
      backgroundColor: bgColor ? bgColor : '#eee',
      justifyContent: 'center',
      alignItems: 'center'
      // zIndex: 500
    }}
  >
    <View
      style={{
        width: 85,
        height: 80
      }}
    >
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          tintColor: '#ccc',
          transform: [{ rotateY: '180deg' }]
        }}
        source={images.noresult}
      />
    </View>

    <Text
      style={{
        textAlign: isRTL ? 'right' : 'left',
        fontSize: 16,
        color: '#bbb',
        top: 20
      }}
    >
      {title}
    </Text>
  </View>
);

export default Noresult;
