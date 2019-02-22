import * as React from 'react';
import { Accelerometer } from 'expo';
import { View, Text, TouchableOpacity } from 'react-native';

export default class AccelerometerSensor extends React.Component<any, any> {
  subscription: any;
  state = {
    orientation: null,
    x: 0,
    y: 0,
    z: 0,
    cordx: 0,
    cordy: 0,
    cordz: 0
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
    this.subscription = Accelerometer.addListener(({ x, y, z }) => {
      const a = round(x);
      const b = round(y);
      const c = round(z);
      if (x > -ac && x < ac && y < 0 && this.state.orientation !== 'pu') {
        this.setState({ orientation: 'pu' });
        // this.props.orientation('pu');
      } else if (
        x > -ac &&
        x < ac &&
        y > 0 &&
        this.state.orientation !== 'pd'
      ) {
        this.setState({ orientation: 'pd' });
        // this.props.orientation('pd');
      } else if (x < -ac && this.state.orientation !== 'll') {
        this.setState({ orientation: 'll' });
        // this.props.orientation('ll');
      } else if (x > ac && this.state.orientation !== 'lr') {
        this.setState({ orientation: 'lr' });
        // this.props.orientation('lr');
      }
      this.setState({ x: a, y: b, z: c });
    });
  };

  unsubscribe = () => {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              cordx: this.state.x,
              cordy: this.state.y,
              cordz: this.state.z
            });
          }}
          style={{ padding: 20, fontSize: 18, backgroundColor: '#ddd' }}
        >
          <Text style={{ fontSize: 20, padding: 20 }}>Get Location</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, padding: 20 }}>
          {this.state.orientation}
        </Text>
        <Text style={{ fontSize: 20, padding: 20 }}>x : {this.state.x}</Text>
        <Text style={{ fontSize: 20, padding: 20 }}>y : {this.state.y}</Text>
        <Text style={{ fontSize: 20, padding: 20 }}>z: {this.state.z}</Text>
      </View>
    );
  }
}
function round(n: any) {
  if (!n) {
    return 0;
  }
  const a = Math.floor(n * 100) / 100;
  return a.toFixed(2);
}
