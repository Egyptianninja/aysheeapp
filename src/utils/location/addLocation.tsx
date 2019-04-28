import { Ionicons } from '@expo/vector-icons';
import { MapView } from 'expo';
import * as React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { rtlos, StyleSheet } from '../common';
import { getUserLocation } from './getUserLocation';
const { Marker }: any = MapView;
class AddLocation extends React.Component<any, any> {
  map: any;
  state = {
    mapType: 'standard',
    loading: false,
    location: null,
    marker: null
  };

  componentDidMount() {
    this.getLocation();
    this.setState({ loading: true });
  }

  getLocation = async () => {
    const location = await getUserLocation();

    if (location.coords) {
      this.setState({ location });
      this.setState({ loading: false });
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

  animateToMarker = (marker: any) => {
    this.map.animateToCoordinate(
      {
        latitude: marker.coordinate.latitude,
        longitude: marker.coordinate.longitude
      },
      250
    );
  };

  handlePress = (e: any) => {
    this.animateToMarker({ coordinate: e.nativeEvent.coordinate });
    this.setState({
      marker: {
        coordinate: e.nativeEvent.coordinate
      }
    });
    const location = {
      coords: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
      }
    };
    this.props.getCurrentLocation(location);
  };

  renderType = () => {
    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          zIndex: 100,
          bottom: 0,
          paddingHorizontal: 10,
          paddingVertical: 5,
          marginVertical: 10,
          marginRight: 5,
          borderColor: '#fff',
          borderWidth: 2,
          borderRadius: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
        onPress={() => {
          this.setState({
            mapType: this.state.mapType === 'standard' ? 'hybrid' : 'standard'
          });
        }}
      >
        <Text style={{ color: '#fff' }}>
          {this.state.mapType === 'standard' ? 'hybrid' : 'standard'}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const location: any = this.state.location;
    const mapType: any = this.state.mapType;
    const { title } = this.props;

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
        {this.renderType()}
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
              height: 350,
              width: this.props.width - 60
            }}
            mapType={mapType}
            showsUserLocation={true}
            userLocationAnnotationTitle="My Location"
            onPress={this.handlePress}
          >
            {this.state.marker &&
              (title && title !== '' ? (
                <Marker {...this.state.marker}>
                  <View style={{ alignItems: 'center', bottom: 15 }}>
                    <View
                      style={{
                        bottom: 15,
                        backgroundColor: '#7678ED',
                        padding: 10
                      }}
                    >
                      <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
                        {this.props.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        bottom: 15,
                        width: 0,
                        height: 0,
                        borderLeftColor: 'transparent',
                        borderLeftWidth: 10,
                        borderRightColor: 'transparent',
                        borderRightWidth: 10,
                        borderTopWidth: 30,
                        borderTopColor: '#7678ED'
                      }}
                    />
                  </View>
                </Marker>
              ) : (
                <Marker {...this.state.marker}>
                  <View style={{ alignItems: 'center', bottom: 15 }}>
                    <View
                      style={{
                        bottom: 15,
                        width: 0,
                        height: 0,
                        borderLeftColor: 'transparent',
                        borderLeftWidth: 10,
                        borderRightColor: 'transparent',
                        borderRightWidth: 10,
                        borderTopWidth: 30,
                        borderTopColor: '#7678ED'
                      }}
                    />
                  </View>
                </Marker>
              ))}
          </MapView>
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
    overflow: 'hidden'
  }
});

export default AddLocation;
