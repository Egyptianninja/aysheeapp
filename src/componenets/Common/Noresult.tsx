import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { images } from '../../load';
const Noresult = ({ title, isRTL, top = 150 }: any) => (
  <View
    style={{
      flex: 1,
      marginTop: top,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      alignItems: 'center',
      zIndex: 500
    }}
  >
    <View
      style={{
        width: 150,
        height: 150,
        opacity: 0.4
      }}
    >
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%'
          // tintColor: '#7678ED'
        }}
        source={images.namelogofull}
      />
    </View>

    <Text
      style={{
        textAlign: isRTL ? 'right' : 'left',
        fontSize: 20,
        color: '#9C949A',
        marginTop: 40
      }}
    >
      {title}
    </Text>
  </View>
);

export default Noresult;
