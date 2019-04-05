import { Gyroscope } from 'expo';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class GyroscopeSensor extends React.Component {
  subscription: any;
  state = {
    gyroscopeData: {
      x: 0,
      y: 0,
      z: 0
    }
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

  slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  subscribe = () => {
    this.subscription = Gyroscope.addListener(result => {
      this.setState({ gyroscopeData: result });
    });
  };

  unsubscribe = () => {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  };

  render() {
    const { x, y, z } = this.state.gyroscopeData;

    return (
      <View style={styles.sensor}>
        <Text>Gyroscope:</Text>
        <Text>
          x: {round(x)} y: {round(y)} z: {round(z)}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.slow}
            style={[styles.button, styles.middleButton]}
          >
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc'
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10
  }
});
