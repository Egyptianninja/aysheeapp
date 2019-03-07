import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

export const User = ({ name, avatar, about, navigation, user }: any) => {
  const uri = `http://res.cloudinary.com/arflon/image/upload/w_${100}/${avatar}`;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('UserProfileScreen', { user });
      }}
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
          {name}
        </Text>
        <Text style={{ fontSize: 16, color: '#fff', textAlign: 'right' }}>
          {about}
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
          source={{ uri }}
        />
      </View>
    </TouchableOpacity>
  );
};
