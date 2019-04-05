import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'expo-core';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        flexDirection: rtl && Platform.OS !== 'android' ? 'row-reverse' : 'row'
      }}
      onPress={() => {
        props.onChange(name, !value);
      }}
    >
      {!selected && (
        <Ionicons name="ios-radio-button-off" size={30} color="#aaa" />
      )}
      {selected && (
        <Ionicons name="ios-checkmark-circle" size={30} color="#7678ED" />
      )}

      <View>
        <Text
          style={{
            alignSelf:
              rtl && Platform.OS !== 'android' ? 'flex-end' : 'flex-start',
            color: labelColor,
            marginHorizontal: 10
          }}
        >
          {label}
        </Text>
        {msg && (
          <Text
            style={{
              alignSelf:
                rtl && Platform.OS !== 'android' ? 'flex-end' : 'flex-start',
              color: '#999',
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
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default CheckBox;
