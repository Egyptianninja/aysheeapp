import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { images } from '../../load';
const Noresult = ({ title, isRTL, top }: any) => (
  <View
    style={{
      flex: 1,
      marginTop: top ? top : 0,
      backgroundColor: '#eee',
      justifyContent: 'flex-start',
      alignItems: 'center',
      zIndex: 500
    }}
  >
    <View
      style={{
        width: 100,
        height: 100
      }}
    >
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          tintColor: '#ccc'
        }}
        source={images.namelogofull}
      />
    </View>

    <Text
      style={{
        textAlign: isRTL ? 'right' : 'left',
        fontSize: 16,
        color: '#bbb',
        marginTop: 20
      }}
    >
      {title}
    </Text>
  </View>
);

export default Noresult;
