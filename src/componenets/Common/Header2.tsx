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
        flexDirection: rtlos() === 3 ? 'row-reverse' : 'row'
      }}
    >
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
            fontSize: 22,
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