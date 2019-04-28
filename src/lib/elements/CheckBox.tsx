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
    msg,
    updateState,
    branch,
    selectBranch,
    resetLocation
  } = props;

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 10,
        marginVertical: 5,
        flexDirection: rtl && Platform.OS !== 'android' ? 'row-reverse' : 'row'
      }}
      onPress={() => {
        if (value || value === false) {
          props.onChange(name, !value);
          if (value === true && resetLocation) {
            if (name === 'singleLocation') {
              resetLocation('singleLocation');
            } else if (name === 'branchLocations') {
              resetLocation('branchLocations');
            }
          }
          if (value === false) {
            if (name === 'singleLocation') {
              props.onChange('branchLocations', false);
              resetLocation('branchLocations');
            } else if (name === 'branchLocations') {
              props.onChange('singleLocation', false);
              resetLocation('singleLocation');
            }
          }
        }

        if (updateState) {
          updateState(!value);
        }
        if (branch) {
          selectBranch(branch);
        }
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
            marginHorizontal: 10,
            top: 7
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
