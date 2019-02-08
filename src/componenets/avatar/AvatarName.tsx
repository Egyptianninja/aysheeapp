import * as React from 'react';
import { Text, View } from 'react-native';
import { nameToColor } from '../../utils';

export const AvatarName = ({ name }: any) => {
  const fletters = name.substring(0, 1).toUpperCase();
  const bgcolor = nameToColor(name);
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgcolor
      }}
    >
      <Text style={{ fontSize: 30, color: '#fff' }}>{fletters}</Text>
    </View>
  );
};
