import * as React from "react";
import { View, ActivityIndicator } from "react-native";

const Loading = () => (
  <View
    style={{
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 140
    }}
  >
    <ActivityIndicator size="small" color="#000" />
  </View>
);

export default Loading;
