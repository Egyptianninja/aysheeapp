import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { Popup } from 'react-native-map-link';

export default class Link extends Component<any, any> {
  state = {
    isVisible: false
  };

  render() {
    return (
      <View style={styles.container}>
        <Popup
          isVisible={this.state.isVisible}
          onCancelPressed={() => this.setState({ isVisible: false })}
          onAppPressed={() => this.setState({ isVisible: false })}
          onBackButtonPressed={() => this.setState({ isVisible: false })}
          appsWhiteList={['apple-maps', 'google-maps', 'uber', 'waze']}
          options={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            title: this.props.title,
            dialogTitle: 'Open Maps',
            dialogMessage: 'Open this location on Maps',
            cancelText: 'Close'
          }}
        />
        <TouchableOpacity
          onPress={() => {
            this.setState({ isVisible: true });
          }}
        >
          <Text style={styles.welcome}>Show in Maps</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7678ED',
    margin: 10
  }
});
