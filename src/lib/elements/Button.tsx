import * as React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';

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
        <ActivityIndicator
          style={{
            position: 'absolute',
            right: isRTL ? 80 : undefined,
            left: isRTL ? undefined : 80,
            top: 20
          }}
          size="small"
          color="#000"
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
