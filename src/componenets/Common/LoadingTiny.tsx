import * as React from 'react';
import { DotIndicatorSmall } from '../../utils';

const LoadingTiny = () => (
  <DotIndicatorSmall
    count={3}
    size={6}
    colors={['#7678ED', '#00B77C', '#E85255']}
  />
);

export default LoadingTiny;
