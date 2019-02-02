import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CheckBox = (props: any) => {
  const {
    label,
    color,
    size,
    labelColor,
    selected,
    name,
    value,
    rtl,
    msg
  } = props;

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: rtl ? "row-reverse" : "row"
      }}
      onPress={() => {
        props.onChange(name, !value);
      }}
    >
      <View
        style={[
          styles.border,
          {
            borderColor: color,
            width: size,
            height: size,
            borderRadius: 5,
            alignSelf: "center"
          }
        ]}
      >
        {selected && (
          <View
            style={{
              backgroundColor: color,
              width: size / 1.5,
              height: size / 1.5,
              borderRadius: 2
            }}
          />
        )}
      </View>
      <View>
        <Text
          style={{
            alignSelf: rtl ? "flex-end" : "flex-start",
            color: labelColor,
            marginHorizontal: 10
          }}
        >
          {label}
        </Text>
        {msg && (
          <Text
            style={{
              alignSelf: rtl ? "flex-end" : "flex-start",
              color: "#999",
              marginHorizontal: 10,
              fontSize: 12
            }}
          >
            {msg}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  border: {
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default CheckBox;
