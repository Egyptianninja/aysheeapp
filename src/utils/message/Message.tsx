import * as React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "../common";

const Message = ({ message }: any) => (
  <View style={styles.message}>
    <Text style={styles.messageText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  message: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  messageText: {
    color: "#000"
  }
});

export default Message;
