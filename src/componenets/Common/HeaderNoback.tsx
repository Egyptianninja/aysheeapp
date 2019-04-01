import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text } from 'react-native';
import { Constants } from 'expo';
import { rtlos } from '../../utils';

const HeaderNoBack = ({ navigation, title }: any) => {
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
    </View>
  );
};

export default HeaderNoBack;
