import * as React from 'react';
import { Slider } from 'react-native';

const SliderUI = ({ name, step = 1, max = 10, propsValue, onChange }: any) => {
  return (
    <Slider
      onValueChange={(value: any) => {
        onChange(name, value);
      }}
      value={propsValue}
      step={step}
      maximumValue={max}
    />
  );
};

export default SliderUI;
