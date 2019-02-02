import * as React from "react";
import { View, Text } from "react-native";

const ErrorMessage = (props: any) => {
  const { label, error, ...rest } = props;
  return (
    <View>
      <Text style={{ color: "#ff5959", paddingHorizontal: 5 }}>
        {props.children}
      </Text>
    </View>
  );
};

export default ErrorMessage;
