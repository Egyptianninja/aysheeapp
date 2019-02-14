import * as React from 'react';
import { DotIndicator } from '../../utils';

const Loading = () => (
  <DotIndicator
    count={3}
    size={10}
    colors={['#3476B5', '#00B77C', '#E85255']}
  />
);

export default Loading;
