import React, { Component } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

export default class StackOverflow extends Component {
  startNavigation(url: any) {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  }

  _onPressButton(mode: any) {
    // driving d
    // walking walking
    // bicycling bicycle
    // transit transit
    this.startNavigation(
      'google.navigation:q=American Century Investments&mode=' + mode
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onPressButton.bind(this, 'd')}>
          <Text>Driving</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressButton.bind(this, 'walking')}>
          <Text>Walking</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressButton.bind(this, 'bicycle')}>
          <Text>Bicycle</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressButton.bind(this, 'transit')}>
          <Text>Transit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
