import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addPermission } from '../../store/actions/globActions';

import { StyleSheet } from '../common';
import { MapView, Location, Permissions } from 'expo';

class UserLocation extends React.Component<any, any> {
  timerHandle: any;
  initLocation: any;
  map: any;
  state = {
    loading: false,
    granted: false,
    initLocation: null
  };

  componentDidMount() {
    this.getLocationAsync();
    this.setState({ loading: true });

    this.timerHandle = setInterval(async () => {
      const location = await this.updateLocation();
      this.props.getCurrentLocation(location);
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.timerHandle);
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.props.onChange('location', false);
      return;
    }
    this.props.addPermission('LOCATION');
    this.setState({ granted: true });
    return this.updateLocation();
  };

  updateLocation = async () => {
    if (!this.state.granted) {
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    this.map.animateToCoordinate(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      1000
    );
    this.setState({ loading: false });
    return location;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.granted && (
          <MapView
            ref={mapView => {
              this.map = mapView;
            }}
            initialRegion={{
              latitude: 25.291442,
              longitude: 51.534011,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            style={{
              alignSelf: 'stretch',
              height: 200,
              width: this.props.width - 60
            }}
            showsUserLocation={true}
            userLocationAnnotationTitle="Ad Location"
            followsUserLocation={true}
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

export default connect(
  null,
  { addPermission }
)(UserLocation);
