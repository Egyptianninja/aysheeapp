import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { words } from '../../store/getStore';
import { Popup } from 'react-native-map-link';
import { getUserLocation } from './getUserLocation';
import LoadingTiny from '../../componenets/Common/LoadingTiny';

export default class Link extends Component<any, any> {
  state = {
    isViewModeVisible: false,
    isDriveModeVisible: false,
    loadinLocation: false,
    location: {
      lat: 0,
      lon: 0
    }
  };

  render() {
    const word = words();
    const { location } = this.state;
    return (
      <View style={styles.container}>
        <Popup
          isVisible={this.state.isViewModeVisible}
          onCancelPressed={() => this.setState({ isViewModeVisible: false })}
          onAppPressed={() => this.setState({ isViewModeVisible: false })}
          onBackButtonPressed={() =>
            this.setState({ isViewModeVisible: false })
          }
          appsWhiteList={['apple-maps', 'google-maps', 'uber', 'waze']}
          options={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            dialogTitle: word.dialogTitle,
            dialogMessage: word.dialogMessage,
            cancelText: word.cancelText
          }}
        />
        <Popup
          isVisible={this.state.isDriveModeVisible}
          onCancelPressed={() => this.setState({ isDriveModeVisible: false })}
          onAppPressed={() => this.setState({ isDriveModeVisible: false })}
          onBackButtonPressed={() =>
            this.setState({ isDriveModeVisible: false })
          }
          appsWhiteList={['apple-maps', 'google-maps', 'uber', 'waze']}
          options={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            sourceLatitude: location.lat,
            sourceLongitude: location.lon,
            dialogTitle: word.dialogTitle,
            dialogMessage: word.dialogMessage,
            cancelText: word.cancelText
          }}
        />
        <View
          style={{
            flex: 1,
            width: '80%',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ isViewModeVisible: true });
            }}
          >
            <Text style={styles.welcome}>{word.showinmap}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              this.setState({ loadinLocation: true });
              const userLocation = await getUserLocation();
              if (userLocation) {
                const trueLocation = {
                  lat: Number(userLocation.coords.latitude),
                  lon: Number(userLocation.coords.longitude)
                };
                await this.setState({ location: trueLocation });
              }
              this.setState({ loadinLocation: false });
              this.setState({ isDriveModeVisible: true });
            }}
          >
            <Text style={styles.welcome}>{word.drivetolocation}</Text>
            {this.state.loadinLocation && <LoadingTiny />}
          </TouchableOpacity>
        </View>
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
