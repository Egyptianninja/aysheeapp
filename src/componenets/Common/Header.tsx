import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import * as React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { rtlos, isIphoneX } from '../../utils';

const Header = ({ navigation, title, backhome }: any) => {
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
        onPress={() =>
          backhome ? navigation.navigate('HomeScreen') : navigation.goBack()
        }
        style={{
          position: 'absolute',
          left: rtlos() === 3 ? -15 : 0,
          top: isIphoneX() ? 42 : Platform.OS === 'android' ? 22 : 18,
          alignItems: 'center',
          padding: 7,
          paddingRight: 15,
          zIndex: 100
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
            fontSize: 18,
            color: '#636363'
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default Header;
