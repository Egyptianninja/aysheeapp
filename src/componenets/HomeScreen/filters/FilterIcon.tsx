import * as React from 'react';
import { Image, View } from 'react-native';

export const FilterIcon = ({ icon, size, color }: any) => {
  return (
    <View style={{ width: size, height: size }}>
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          tintColor: color
        }}
        source={icon}
      />
    </View>
  );
};
