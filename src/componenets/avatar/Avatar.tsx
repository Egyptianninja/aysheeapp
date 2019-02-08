import * as React from 'react';
import { Text, View } from 'react-native';
import { nameToColor } from '../../utils';

export const Avatar = ({ name }: any) => {
  const fletters = name.substring(0, 1).toUpperCase();
  const bgcolor = nameToColor(name);

  return (
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgcolor
      }}
    >
      <Text style={{ fontSize: 40, color: '#fff' }}>{fletters}</Text>
    </View>
  );
};
