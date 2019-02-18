import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Platform } from 'expo-core';

const RadioButton = (props: any) => {
  const { label, color, size, labelColor, selected, name, rtl, group } = props;

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: rtl && Platform.OS !== 'android' ? 'row-reverse' : 'row'
      }}
      onPress={() => {
        group.map((member: any) => {
          member === name
            ? props.onChange(member, true)
            : props.onChange(member, false);
        });
      }}
    >
      <View
        style={[
          styles.border,
          {
            borderColor: color,
            width: size,
            height: size,
            borderRadius: size / 2,
            alignSelf: 'center'
          }
        ]}
      >
        {selected && (
          <View
            style={{
              backgroundColor: color,
              width: size / 2,
              height: size / 2,
              borderRadius: size / 2
            }}
          />
        )}
      </View>
      <Text
        style={{
          alignSelf: 'center',
          color: labelColor,
          marginHorizontal: 5
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  border: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default RadioButton;
