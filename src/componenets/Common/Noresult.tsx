import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { images } from '../../load';
const Noresult = ({ title, isRTL, top, bgColor }: any) => (
  <View
    style={{
      flex: 1,
      marginTop: top ? top : 0,
      backgroundColor: bgColor ? bgColor : '#fff',
      justifyContent: 'flex-start',
      alignItems: 'center',
      zIndex: 500
    }}
  >
    <View
      style={{
        width: 150,
        height: 150
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
        source={images.searchbig}
      />
    </View>

    <Text
      style={{
        textAlign: isRTL ? 'right' : 'left',
        fontSize: 16,
        color: '#bbb',
        top: -20
      }}
    >
      {title}
    </Text>
  </View>
);

export default Noresult;
