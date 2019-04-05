import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { rtlos } from '../../utils';

export const User = ({ name, avatar, about, navigation, user }: any) => {
  const uri = `http://res.cloudinary.com/arflon/image/upload/w_${100}/${avatar}`;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProfileScreen', { user });
      }}
      style={{
        alignItems: 'center',
        flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
        justifyContent: 'flex-end',
        margin: 10,
        paddingTop: 15,
        marginLeft: 60
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
            textAlign: rtlos() === 3 ? 'left' : 'right'
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
