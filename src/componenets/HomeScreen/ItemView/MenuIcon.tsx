import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export const MenuIcon = ({ showMenuModal, imageWidth, isrtl, post }: any) => (
  <TouchableOpacity
    onPress={() => showMenuModal(post)}
    style={{
      position: 'absolute',
      left: imageWidth - 40,
      paddingHorizontal: 5,
      paddingLeft: isrtl ? undefined : 15,
      paddingRight: isrtl ? 15 : undefined,
      zIndex: 100
    }}
  >
    <Ionicons name="md-more" size={26} color="#aaa" />
  </TouchableOpacity>
);
