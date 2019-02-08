import * as React from 'react';
import { View, Text } from 'react-native';
import { nameToColor } from '../../utils';

export const AvatarPhone = ({ name }: any) => {
  const fletters = name.substring(0, 1).toUpperCase();
  const bgcolor = nameToColor(name);
  return (
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgcolor
      }}
    >
      <Text style={{ fontSize: 24, color: '#fff' }}>{fletters}</Text>
    </View>
  );
};
