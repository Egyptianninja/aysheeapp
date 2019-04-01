import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AuthRequire = ({ navigation }: any) => {
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
          width: 150,
          height: 150,
          borderRadius: 75
        }}
      >
        <Ionicons name="md-person" size={130} color="#fff" />
      </View>
      <Text style={{ marginTop: 20, color: '#aaa' }}>
        Please login to your accout
      </Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PhoneScreen', {
            origin: 'profile'
          })
        }
        style={{
          width: 250,
          height: 40,
          backgroundColor: '#fff',
          borderRadius: 20,
          marginTop: 100,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#7678ED', fontSize: 16 }}>
          continue to login
        </Text>
      </TouchableOpacity>
    </View>
  );
};
