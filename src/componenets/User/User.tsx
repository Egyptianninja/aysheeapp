import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { images } from '../../load';

export const User = ({ icon }: any) => {
  const img: any = images[`b${icon}`];
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 10,
        paddingTop: 20
      }}
    >
      <View
        style={{
          padding: 10
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: '#fff',
            textAlign: 'right'
          }}
        >
          Jarir Bookstore
        </Text>
        <Text style={{ fontSize: 16, color: '#fff', textAlign: 'right' }}>
          Not Just a Bookstore
        </Text>
      </View>

      <View
        style={{
          width: 58,
          height: 58,
          borderRadius: 29,
          borderColor: '#fff',
          borderWidth: 2,
          // backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 25
          }}
          source={img}
        />
      </View>
    </View>
  );
};
