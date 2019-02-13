import * as React from 'react';
import { View, Image } from 'react-native';

export const FilterIcon = ({ icon, size }: any) => {
  return (
    <View style={{ width: size, height: size }}>
      <Image
        style={{
          flex: 1,
          width: '100%',
          height: '100%'
        }}
        source={icon}
      />
    </View>
  );
};
