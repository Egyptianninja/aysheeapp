import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { call, rtlos } from '../../utils';
import { AvatarCircle } from '../Avatar';

export const renderUser = ({
  user,
  callargs,
  word,
  me,
  navigation,
  ardroid
}: any) => {
  return (
    <View
      style={{
        flexDirection: ardroid ? 'row-reverse' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderBottomLeftRadius: rtlos() === 3 ? undefined : 35,
        borderTopLeftRadius: rtlos() === 3 ? undefined : 35,
        borderBottomRightRadius: rtlos() === 3 ? 35 : undefined,
        borderTopRightRadius: rtlos() === 3 ? 35 : undefined
      }}
    >
      <View style={{ flex: 2, flexDirection: ardroid ? 'row-reverse' : 'row' }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProfileScreen', { user });
          }}
        >
          <AvatarCircle user={user} size={50} />
        </TouchableOpacity>

        <View
          style={{
            paddingHorizontal: 10,
            alignItems: rtlos() === 3 ? 'flex-end' : 'flex-start'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileScreen', { user });
            }}
          >
            {(user.name || user.name !== '') && (
              <Text style={{ fontWeight: 'bold' }}>{user.name} </Text>
            )}
            <Text style={{ fontSize: 12, color: '#888' }}>
              {user.uniquename}
            </Text>
          </TouchableOpacity>
          {user.onlineqty > 0 && (
            <Text
              style={{
                fontSize: 12,
                color: '#7678ED',
                paddingTop: 5
              }}
            >
              {user.onlineqty} {word.moreads}
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
          backgroundColor: '#8E90F0',
          alignItems: 'center',
          flexDirection: ardroid ? 'row-reverse' : 'row'
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
};
