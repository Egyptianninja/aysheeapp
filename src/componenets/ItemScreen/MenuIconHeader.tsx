import * as React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { icons } from '../../load';
const icon = icons.itemmenuiconup.icon();

export const MenuIconHeader = ({ showMenuModal, post }: any) => (
  <TouchableOpacity
    onPress={() => showMenuModal()}
    style={{ paddingHorizontal: 10 }}
  >
    <View
      style={{
        width: 25,
        height: 35,
        paddingVertical: 4
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
