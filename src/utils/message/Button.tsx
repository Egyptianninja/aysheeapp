import * as React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

const Button = (props: any) => {
  const {
    title,
    style,
    disabled,
    background,
    textStyle,
    loading,
    lang,
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
            right: lang === 'ar' ? 80 : undefined,
            left: lang === 'ar' ? undefined : 80,
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
