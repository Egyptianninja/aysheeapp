import { Ionicons } from '@expo/vector-icons';

import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Popup } from 'react-native-map-link';
import LoadingTiny from '../../componenets/Common/LoadingTiny';
import { words } from '../../store/getStore';
import { getUserLocation } from './getUserLocation';

export default class Drive extends Component<any, any> {
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
      <View>
        <Popup
          isVisible={this.state.isDriveModeVisible}
          onCancelPressed={() => this.setState({ isDriveModeVisible: false })}
          onAppPressed={async () => {
            this.setState({ isDriveModeVisible: false });
          }}
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
            height: 40,
            width: 40,
            left: 2,
            borderRadius: 5,
            backgroundColor: '#7678ED',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5
            },
            shadowOpacity: 0.4,
            shadowRadius: 5,
            elevation: 5
          }}
        >
          <Ionicons name="ios-car" size={28} color="#fff" />

          {this.state.loadinLocation && <LoadingTiny size={15} color="#fff" />}
        </TouchableOpacity>
      </View>
    );
  }
}
