import * as React from 'react';
import { View } from 'react-native';

import Orientation from './orientation';
const Sensors = () => (
  <View>
    <Orientation accuracy={0.7} orientation={orient} />
  </View>
);

const orient = (or: any) => {
  console.log(or);
};

export default Sensors;
