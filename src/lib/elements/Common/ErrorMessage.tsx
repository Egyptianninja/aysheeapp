import * as React from 'react';
import { Text, View } from 'react-native';

const ErrorMessage = (props: any) => {
  const { label, color, error, ...rest } = props;
  return (
    <View>
      <Text style={{ color: color ? color : '#E85255', paddingHorizontal: 5 }}>
        {props.children}
      </Text>
    </View>
  );
};

export default ErrorMessage;
