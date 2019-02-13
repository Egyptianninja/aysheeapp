import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export const MenuIcon = ({ showMenuModal, post }: any) => (
  <TouchableOpacity
    onPress={() => showMenuModal()}
    style={{ paddingHorizontal: 10 }}
  >
    <Ionicons name="md-more" size={32} color="#aaa" />
  </TouchableOpacity>
);
