import * as React from "react";
import { View, TouchableOpacity } from "react-native";
import AutogrowInput from "../../../lib/elements/AutoInput";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "../../../utils";

export default class InputBar extends React.Component<any, any> {
  autogrowInput: any;

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.text === "") {
      this.autogrowInput.resetInputText();
    }
  }
  getFocus = () => {
    this.autogrowInput.focus();
  };

  render() {
    return (
      <View style={styles.inputBar}>
        <AutogrowInput
          style={[
            styles.textBox,
            { textAlign: this.props.lang === "ar" ? "right" : "left" }
          ]}
          ref={(ref: any) => {
            this.autogrowInput = ref;
          }}
          multiline={true}
          placeholder={this.props.placeholder}
          defaultHeight={36}
          onChangeText={(text: string) => {
            this.props.onChangeText(text);
          }}
          value={this.props.text}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => this.props.onSendPressed(this.props.postId)}
        >
          <Ionicons
            name="ios-paper-plane"
            color="#555"
            size={36}
            style={{
              width: 30
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#555",
    shadowOpacity: 0.2
  },

  textBox: {
    writingDirection: "auto",
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    paddingHorizontal: 10,
    marginVertical: 2
  },

  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10
  }
});
