import * as React from 'react';
import { View, Image, Text } from 'react-native';

const Noresult = ({ title, isRTL }: any) => (
  <View
    style={{
      flex: 1,
      marginTop: 150,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      alignItems: 'center',
      zIndex: 500
    }}
  >
    <View
      style={{
        width: 200,
        height: 200,
        opacity: 0.4
      }}
    >
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%'
        }}
        source={require('../../../assets/icons/main/searchbook.png')}
      />
    </View>

    <Text
      style={{
        textAlign: isRTL ? 'right' : 'left',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#9C949A'
      }}
    >
      {title}
    </Text>
  </View>
);

export default Noresult;
