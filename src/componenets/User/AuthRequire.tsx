import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const AuthRequire = ({ navigation, origin }: any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'
      }}
    >
      <View
        style={{
          borderColor: '#fff',
          borderWidth: 3,
          justifyContent: 'center',
          alignItems: 'center',
          width: 140,
          height: 140,
          borderRadius: 75
        }}
      >
        <Ionicons name="md-person" size={110} color="#fff" />
      </View>
      <Text style={{ marginTop: 40, color: '#777' }}>
        Please login to your accout
      </Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PhoneScreen', {
            origin
          })
        }
        style={{
          width: 250,
          height: 40,
          backgroundColor: '#fff',
          borderRadius: 20,
          marginTop: 100,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#999',
          shadowOffset: {
            width: 0,
            height: 5
          },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5
        }}
      >
        <Text style={{ color: '#7678ED', fontSize: 16 }}>
          continue to login
        </Text>
      </TouchableOpacity>
    </View>
  );
};
