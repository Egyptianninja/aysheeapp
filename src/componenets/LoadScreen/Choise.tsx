import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { rtlos } from '../../utils';

export const Choise = ({ country, city, action, width }: any) => {
  return (
    <TouchableOpacity
      onPress={async () => {
        action({ country, city });
      }}
      style={{
        flexDirection: 'row',
        margin: 7,
        justifyContent: rtlos() === 3 ? 'flex-end' : 'flex-start',
        alignItems: 'center',
        width: width - 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: '#555',
        shadowOpacity: 0.3
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: 'cairo-regular',
          textAlign: 'right',
          paddingHorizontal: 10,
          color: '#000'
        }}
      >
        {country}
      </Text>
    </TouchableOpacity>
  );
};
