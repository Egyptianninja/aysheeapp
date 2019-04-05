import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { DotIndicatorSmall } from '../../utils';

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
          <DotIndicatorSmall count={3} size={7} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
