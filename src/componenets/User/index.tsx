import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { call } from '../../utils';

import { Avatar } from '../Avatar';

export const renderUser = ({
  user,
  callargs,
  word,
  isAuthenticated,
  userId,
  navigation
}: any) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f1f1f1',
      padding: 10,
      borderBottomLeftRadius: 35,
      borderTopLeftRadius: 35
    }}
  >
    <View style={{ flex: 2, flexDirection: 'row' }}>
      {user.avatar && (
        <TouchableOpacity
          onPress={() => {
            if (isAuthenticated) {
              const screen =
                user._id === userId ? 'MyPostsScreen' : 'UserProfileScreen';
              navigation.navigate(screen, { user });
            } else {
              navigation.navigate('UserProfileScreen', { user });
            }
          }}
        >
          <Image
            style={{
              height: 50,
              width: 50,
              borderRadius: 25
            }}
            source={{
              uri: `http://res.cloudinary.com/arflon/image/upload/w_${100}/${
                user.avatar
              }`
            }}
          />
        </TouchableOpacity>
      )}
      {!user.avatar && (
        <TouchableOpacity
          onPress={() => {
            if (isAuthenticated) {
              const screen =
                user._id === userId ? 'MyPostsScreen' : 'UserProfileScreen';
              navigation.navigate(screen, { user });
            } else {
              navigation.navigate('UserProfileScreen', { user });
            }
          }}
        >
          <Avatar name={user.name ? user.name : user.uniquename} size={50} />
        </TouchableOpacity>
      )}
      <View style={{ paddingLeft: 10 }}>
        <TouchableOpacity
          onPress={() => {
            if (isAuthenticated) {
              const screen =
                user._id === userId ? 'MyPostsScreen' : 'UserProfileScreen';
              navigation.navigate(screen, { user });
            } else {
              navigation.navigate('UserProfileScreen', { user });
            }
          }}
        >
          {user.name && <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>}
          {user.uniquename && (
            <Text style={{ fontSize: 12, color: '#888' }}>
              {user.uniquename}
            </Text>
          )}
        </TouchableOpacity>
        {user.postsQty > 0 && (
          <Text
            style={{
              fontSize: 12,
              color: '#7678ED',
              paddingTop: 5
            }}
          >
            {user.postsQty} {word.moreads}
          </Text>
        )}
      </View>
    </View>

    <TouchableOpacity
      onPress={() => call(callargs)}
      style={{
        width: 85,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7678ED',
        flexDirection: 'row'
      }}
    >
      <Ionicons
        name="ios-call"
        size={26}
        style={{ paddingRight: 10 }}
        color="#fff"
      />

      <Text
        style={{
          fontSize: 14,
          color: '#fff'
        }}
      >
        {word.calladvertiser}
      </Text>
    </TouchableOpacity>
  </View>
);
