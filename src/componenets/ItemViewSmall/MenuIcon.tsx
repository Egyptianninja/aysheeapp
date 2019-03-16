import * as React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { icons } from '../../load';
const icon = icons.itemmenuiconup.icon();

export const MenuIcon = ({ showMenuModal, post }: any) => (
  <TouchableOpacity
    onPress={() => showMenuModal(post)}
    style={{
      position: 'absolute',
      paddingRight: 8,
      paddingLeft: 12,
      paddingVertical: 10,
      right: 0,
      top: 0,
      zIndex: 100
    }}
  >
    <View
      style={{
        borderRadius: 6,
        width: 20,
        height: 38,
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
      }}
    >
      <Image
        style={{
          opacity: 0.7,
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
