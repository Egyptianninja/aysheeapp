import * as React from 'react';
import PulseIndicator from '../../utils/loading/PulseIndicator';

const LoadingTiny = ({ size = 20 }) => (
  <PulseIndicator color="#7678ED" size={size} />
);

export default LoadingTiny;
