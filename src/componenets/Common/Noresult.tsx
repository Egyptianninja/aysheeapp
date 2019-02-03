import * as React from 'react';
import { View, Image, Text } from 'react-native';

const Noresult = ({ lang, title }: any) => (
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
        source={require('../../../assets/icons/searchbook.png')}
      />
    </View>

    <Text
      style={{
        textAlign: lang === 'ar' ? 'right' : 'left',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#6FA7D5',
        opacity: 0.8
      }}
    >
      {title}
    </Text>
  </View>
);

export default Noresult;
