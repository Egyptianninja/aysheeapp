import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AvatarCircle } from '../Avatar';

const ShopItem = ({ user, myId, navigation, width }: any) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: 120,
        flexDirection: 'row-reverse',
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 5
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileScreen', { user })}
        style={{
          marginTop: 20,
          marginHorizontal: 20
        }}
      >
        <AvatarCircle user={user} size={76} />
      </TouchableOpacity>
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          zIndex: 10,
          alignItems: 'flex-end'
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen', { user })}
          style={{
            alignItems: 'flex-end'
          }}
        >
          {!user.name && (
            <Text
              style={{
                fontFamily: 'cairo-regular',
                fontSize: 16
              }}
            >
              {user.uniquename}
            </Text>
          )}
          {user.name && (
            <Text
              style={{
                fontFamily: 'cairo-regular',
                fontSize: 16
              }}
            >
              {user.name}
            </Text>
          )}
          <Text
            style={{
              fontFamily: 'cairo-regular',
              fontSize: 14,
              color: '#777'
            }}
          >
            {user.about}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: width - 150,
            height: 30,
            marginTop: 5,
            backgroundColor: '#fff',
            flexDirection: 'row-reverse'
          }}
        >
          <Text
            style={{
              color: user.color,
              fontFamily: 'cairo-regular',
              paddingLeft: 40,
              fontSize: 12
            }}
          >
            العروض {user.offersqty}
          </Text>
          <Text
            style={{
              color: user.color,
              fontFamily: 'cairo-regular',
              paddingLeft: 20,
              fontSize: 12
            }}
          >
            الاعلانات {user.onlineqty}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShopItem;
