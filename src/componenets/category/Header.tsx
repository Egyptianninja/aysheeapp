import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import { Constants } from 'expo';
import { rtlos } from '../../utils';

const Header = ({ navigation, title, showFilterModal }: any) => {
  return (
    <View
      style={{
        paddingTop: Constants.statusBarHeight,
        height: Constants.statusBarHeight + 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        backgroundColor: '#f3f3f3',
        flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          left: rtlos() === 3 ? -15 : 0,
          top: Platform.OS === 'android' ? 22 : 18,
          alignItems: 'center',
          paddingVertical: 7,
          paddingLeft: 5,
          paddingRight: 20,
          zIndex: 120
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
          <Ionicons name="ios-arrow-back" size={30} color="#636363" />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontFamily: 'cairo-regular',
            fontSize: 18,
            color: '#636363'
          }}
        >
          {title}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => showFilterModal()}
        style={{
          position: 'absolute',
          right: 0,
          top: 22,
          alignItems: 'center',
          padding: 5,
          paddingLeft: 20,
          zIndex: 120
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Ionicons name="ios-options" size={30} color="#636363" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
