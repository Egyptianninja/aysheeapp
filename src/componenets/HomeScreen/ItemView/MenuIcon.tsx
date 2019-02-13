import * as React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { icons } from '../../../load';
const icon = icons.itemmenuicon.icon();

export const MenuIcon = ({ showMenuModal, imageWidth, isrtl, post }: any) => (
  <TouchableOpacity
    onPress={() => showMenuModal(post)}
    style={{
      position: 'absolute',
      right: 0,
      top: 10,
      padding: 5,
      marginRight: 5,
      borderRadius: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: 5,
      zIndex: 100
    }}
  >
    <View
      style={{
        width: 30,
        height: 10
      }}
    >
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          resizeMode: 'contain'
        }}
        source={icon}
      />
    </View>
  </TouchableOpacity>
);
