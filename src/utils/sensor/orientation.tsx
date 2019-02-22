import * as React from 'react';
import { Accelerometer } from 'expo';

export default class AccelerometerSensor extends React.Component<any, any> {
  subscription: any;
  state = {
    orientation: null
  };

  componentDidMount() {
    this.toggle();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  toggle = () => {
    if (this.subscription) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  };

  subscribe = () => {
    const ac = this.props.accuracy;
    this.subscription = Accelerometer.addListener(({ x, y }) => {
      if (x > -ac && x < ac && y < 0 && this.state.orientation !== 'pu') {
        this.setState({ orientation: 'pu' });
        this.props.orientation('pu');
      } else if (
        x > -ac &&
        x < ac &&
        y > 0 &&
        this.state.orientation !== 'pd'
      ) {
        this.setState({ orientation: 'pd' });
        this.props.orientation('pd');
      } else if (x < -ac && this.state.orientation !== 'll') {
        this.setState({ orientation: 'll' });
        this.props.orientation('ll');
      } else if (x > ac && this.state.orientation !== 'lr') {
        this.setState({ orientation: 'lr' });
        this.props.orientation('lr');
      }
    });
  };

  unsubscribe = () => {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  };

  render() {
    return null;
  }
}
