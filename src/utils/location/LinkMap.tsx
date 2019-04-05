import { Constants } from 'expo';
import React, { Component } from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class LinkMap extends Component {
  openGps = () => {
    // const scheme = Platform.OS === "ios" ? "maps:" : "geo:";
    const scheme = 'geo:';
    const url = scheme + '37.484847,-122.148386';
    this.openExternalApp(url);
  };

  openExternalApp = (url: any) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('ERROR', 'Unable to open: ' + url, [{ text: 'OK' }]);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.openGps}>
          <Text>Click to open Map</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  }
});
