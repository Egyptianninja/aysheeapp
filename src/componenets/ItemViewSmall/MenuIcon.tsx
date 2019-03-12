import * as React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { icons } from '../../load';
const icon = icons.itemmenuiconup.icon();

export const MenuIcon = ({ showMenuModal, post }: any) => (
  <TouchableOpacity
    onPress={() => showMenuModal(post)}
    style={{
      position: 'absolute',
      right: 3,
      top: 10,
      marginRight: 2,
      zIndex: 100
    }}
  >
    <View
      style={{
        borderRadius: 6,
        width: 20,
        height: 35,
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
