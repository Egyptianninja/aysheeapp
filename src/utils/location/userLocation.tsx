import { Ionicons } from '@expo/vector-icons';
import { MapView } from 'expo';
import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { rtlos, StyleSheet } from '../common';
import { getUserLocation } from './getUserLocation';

class UserLocation extends React.Component<any, any> {
  map: any;
  state = {
    loading: false,
    location: null
  };

  componentDidMount() {
    this.getLocation();
    this.setState({ loading: true });
  }

  getLocation = async () => {
    const location = await getUserLocation(true);
    if (location.coords) {
      this.props.getCurrentLocation(location);
      this.setState({ location });
      this.setState({ loading: false });
      return location;
    }
  };

  animateToLocation = (location: any) => {
    this.map.animateToCoordinate(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      350
    );
  };

  render() {
    const location: any = this.state.location;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.animateToLocation(location)}
          style={{
            position: 'absolute',
            right: rtlos() === 3 ? undefined : 8,
            left: rtlos() === 3 ? 8 : undefined,
            top: 5,
            zIndex: 100
          }}
        >
          <Ionicons name="ios-locate" size={30} color="#9B9CF1" />
        </TouchableOpacity>
        {location && (
          <MapView
            ref={mapView => {
              this.map = mapView;
            }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.00783,
              longitudeDelta: 0.01299
            }}
            style={{
              alignSelf: 'stretch',
              height: 200,
              width: this.props.width - 60
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            userLocationAnnotationTitle="Location"
            // onRegionChangeComplete={region => {
            //   console.log(region);
            // }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#fff',
    // borderRadius: 5,
    overflow: 'hidden'
  }
});

export default UserLocation;
