import * as React from 'react';
import { Text, View } from 'react-native';
import { nameToColor } from '../../utils';

export const Avatar = ({ name, size }: any) => {
  const fletters = name.substring(0, 1).toUpperCase();
  const bgcolor = nameToColor(name);

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgcolor
      }}
    >
      <Text style={{ fontSize: size / 2, color: '#fff' }}>{fletters}</Text>
    </View>
  );
};
