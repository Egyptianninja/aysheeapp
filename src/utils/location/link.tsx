import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Popup } from 'react-native-map-link';
import LoadingTiny from '../../componenets/Common/LoadingTiny';
import { words } from '../../store/getStore';
import { rtlos } from '../common';
import { getUserLocation } from './getUserLocation';

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
            width: '90%',
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
            justifyContent: 'space-around'
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ isViewModeVisible: true });
            }}
            style={{
              flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
              alignItems: 'center',
              borderRadius: 20
            }}
          >
            <Ionicons name="ios-map" size={30} color="#fff" />
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
            style={{
              flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
              alignItems: 'center',
              borderRadius: 20
            }}
          >
            <View
              style={{
                position: 'absolute',
                height: 30,
                width: 2,
                left: -10,
                backgroundColor: '#fff'
              }}
            />
            <Ionicons name="ios-car" size={30} color="#fff" />
            <Text style={styles.welcome}>{word.drivetolocation}</Text>
            {this.state.loadinLocation && (
              <LoadingTiny size={15} color="#fff" />
            )}
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
    alignItems: 'center',
    backgroundColor: '#8E90F0',
    marginHorizontal: 10,
    marginTop: -1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  welcome: {
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    margin: 10
  }
});
