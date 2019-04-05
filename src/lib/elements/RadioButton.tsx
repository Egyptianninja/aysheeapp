import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'expo-core';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
      {!selected && (
        <Ionicons name="ios-radio-button-off" size={30} color="#aaa" />
      )}
      {selected && (
        <Ionicons name="ios-checkmark-circle" size={30} color="#7678ED" />
      )}
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
