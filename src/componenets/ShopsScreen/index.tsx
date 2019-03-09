import * as React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Avatar } from '../Avatar';
import { Ionicons } from '@expo/vector-icons';

const ShopItem = ({ user, myId, navigation, width }: any) => {
  const maincolor = user.color ? user.color : '#7678ED';
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
          height: 80,
          width: 80,
          borderColor: maincolor,
          borderWidth: 2,
          borderRadius: 40,
          overflow: 'hidden',
          backgroundColor: '#fff',
          marginTop: 20,
          marginHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!user.avatar && (
          <Avatar name={user.name ? user.name : user.uniquename} size={72} />
        )}
        {user.avatar && (
          <Image
            style={{
              flex: 1,
              width: 72,
              height: 72
            }}
            source={{
              uri: `http://res.cloudinary.com/arflon/image/upload/w_${100}/${
                user.avatar
              }`
            }}
          />
        )}
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
