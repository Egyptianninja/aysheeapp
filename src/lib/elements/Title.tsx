import * as React from 'react';
import { Text, View } from 'react-native';

const Title = (props: any) => {
  return (
    <View
      style={{
        height: 60,
        width: props.width,
        padding: 15,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text
        style={{
          paddingLeft: 20,
          fontSize: 20,
          color: '#6FA7D5'
        }}
      >
        {props.children}
      </Text>
    </View>
  );
};

export default Title;
