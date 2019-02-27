import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addPermission } from '../../store/actions/globActions';

import { StyleSheet } from '../common';
import { MapView, Location, Permissions } from 'expo';

class UserLocation extends React.Component<any, any> {
  timerHandle: any;
  map: any;
  state = {
    loading: false,
    granted: false
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
            style={{
              alignSelf: 'stretch',
              height: 200,
              width: this.props.width - 40
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden'
  }
});

export default connect(
  null,
  { addPermission }
)(UserLocation);
