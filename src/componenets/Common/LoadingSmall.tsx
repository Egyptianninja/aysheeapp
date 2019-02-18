import * as React from 'react';
import { DotIndicatorSmall } from '../../utils';

const LoadingSmall = () => (
  <DotIndicatorSmall
    count={3}
    size={10}
    colors={['#7678ED', '#00B77C', '#E85255']}
  />
);

export default LoadingSmall;
