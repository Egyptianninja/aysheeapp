import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export const PhotoPicker = ({ label, pickImage, icon, width }: any) => {
  return (
    <TouchableOpacity
      onPress={pickImage}
      style={{
        width: (width - 60) / 2,
        height: 45,
        backgroundColor: '#eee',
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
          <Ionicons name={icon} size={36} color="#777" />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: '#777',
              paddingHorizontal: 10
            }}
          >
            {label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
