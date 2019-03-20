import * as React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LoadingSmall } from '../../componenets';

const Button = (props: any) => {
  const {
    title,
    style,
    disabled,
    background,
    textStyle,
    loading,
    isRTL,
    ...rest
  } = props;
  return (
    <TouchableOpacity
      style={[
        style,
        {
          backgroundColor: disabled ? '#ccc' : background
        }
      ]}
      {...rest}
      disabled={disabled}
    >
      <Text style={textStyle}>{title}</Text>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 33
          }}
        >
          <LoadingSmall />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
