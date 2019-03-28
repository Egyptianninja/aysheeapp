import * as React from 'react';
import { View, Text } from 'react-native';

const MainBox = ({ width, title, body }: any) => {
  return (
    <View style={{ flex: 1, padding: 10, width }}>
      <Text style={{ fontSize: 18, color: '#00B77C', fontWeight: 'bold' }}>
        {title}
      </Text>
      <Text style={{ color: '#999', fontSize: 14 }}>{body}</Text>
    </View>
  );
};

export default MainBox;
