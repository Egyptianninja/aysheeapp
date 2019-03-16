import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

const BackIcon = ({ navigation }: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={{
        top: 5,
        left: 0,
        paddingLeft: 5,
        width: 50,
        height: 45
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Ionicons name="ios-arrow-back" size={30} color="#fff" />
      </View>
    </TouchableOpacity>
  );
};

export default BackIcon;