import * as React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { icons } from '../../../load';
const icon = icons.itemmenuiconup.icon();

export const MenuIcon = ({ showMenuModal, imageWidth, isrtl, post }: any) => (
  <TouchableOpacity
    onPress={() => showMenuModal(post)}
    style={{
      position: 'absolute',
      right: -3,
      top: 7,
      padding: 5,
      marginRight: 5,
      paddingHorizontal: 5,
      zIndex: 100
    }}
  >
    <View
      style={{
        padding: 2,
        paddingVertical: 6,
        borderRadius: 10,
        width: 15,
        height: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
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
