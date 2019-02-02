import * as React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

const MessageModal = ({ isVisible, message, lang, width }: any) => (
  <Modal
    isVisible={isVisible}
    backdropOpacity={0.2}
    useNativeDriver={true}
    hideModalContentWhileAnimating={true}
    style={{ flex: 1 }}
  >
    <View
      style={{
        borderRadius: 10,
        height: 100,
        padding: 10,
        width: width - 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
      }}
    >
      <View
        style={{
          flex: 1,
          width: width - 80,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: lang === "ar" ? "row-reverse" : "row"
        }}
      >
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 18,
            fontWeight: "bold",
            color: "#ababab"
          }}
        >
          {message}
        </Text>
        <Ionicons name="ios-checkmark-circle" size={36} color="#26A65B" />
      </View>
    </View>
  </Modal>
);

export default MessageModal;
