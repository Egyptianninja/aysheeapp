import * as React from 'react';
import { DotIndicator } from '../../utils';

const Loading = () => {
  return (
    <DotIndicator
      count={3}
      size={10}
      // colors={['#7678ED', '#00B77C', '#E85255']}
      // color="#7678ED"
    />
  );
};

export default Loading;
