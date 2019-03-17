import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text } from 'react-native';
import { Constants } from 'expo';
import { rtlos } from '../../utils';

const Header = ({ navigation, title }: any) => {
  return (
    <View
      style={{
        paddingTop: Constants.statusBarHeight,
        height: Constants.statusBarHeight + 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: '#7678ED',
        flexDirection: rtlos() ? 'row-reverse' : 'row'
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          flex: 1,
          alignItems: 'center'
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
      <View
        style={{
          flex: 6,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontFamily: 'cairo-regular',
            fontSize: 18,
            color: '#fff'
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
