import * as React from 'react';
import PulseIndicator from '../../utils/loading/PulseIndicator';

const LoadingTiny = ({ size = 20, color = '#7678ED' }) => (
  <PulseIndicator color={color} size={size} />
);

export default LoadingTiny;
