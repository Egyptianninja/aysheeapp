import { Accelerometer } from 'expo';
import { Platform } from 'expo-core';
import * as React from 'react';

export default class Orientation extends React.Component<any, any> {
  subscription: any;
  state = {
    orientation: null,
    android: false
  };
  componentDidMount() {
    this.toggle();
    this.setState({ android: Platform.OS === 'android' ? true : false });
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
      if (Platform.OS === 'android') {
        if (x > -ac && x < ac && this.state.orientation !== 'pu') {
          this.setState({ orientation: 'pu' });
          this.props.orientation('pu');
        } else if (x < -ac && this.state.orientation !== 'lr') {
          this.setState({ orientation: 'lr' });
          this.props.orientation('lr');
        } else if (x > ac && this.state.orientation !== 'll') {
          this.setState({ orientation: 'll' });
          this.props.orientation('ll');
        }
      } else {
        if (x > -ac && x < ac && this.state.orientation !== 'pu') {
          this.setState({ orientation: 'pu' });
          this.props.orientation('pu');
        } else if (x < -ac && this.state.orientation !== 'll') {
          this.setState({ orientation: 'll' });
          this.props.orientation('ll');
        } else if (x > ac && this.state.orientation !== 'lr') {
          this.setState({ orientation: 'lr' });
          this.props.orientation('lr');
        }
      }
    });
    Accelerometer.setUpdateInterval(1000);
  };
  unsubscribe = () => {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  };
  render() {
    return null;
  }
}
