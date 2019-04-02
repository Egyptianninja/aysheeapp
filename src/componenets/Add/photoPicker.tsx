import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export const PhotoPicker = ({ label, pickImage, icon, width }: any) => {
  return (
    <TouchableOpacity
      onPress={pickImage}
      style={{
        width: (width - 80) / 2,
        height: 75,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 6,
        margin: 10
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Ionicons name={icon} size={50} color="#8E90F0" />
        </View>
        <Text
          style={{
            fontSize: 30,
            position: 'absolute',
            top: -12,
            right: 10,
            color: '#8E90F0'
          }}
        >
          +
        </Text>
      </View>
    </TouchableOpacity>
  );
};
