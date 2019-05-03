import { Ionicons } from '@expo/vector-icons';

import { MapView } from 'expo';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Drive from '../../utils/location/drive';
import { rtlos } from '../../utils';

const { Marker, Callout }: any = MapView;

export default class Maps extends React.Component<any, any> {
  map: any;
  mymarker: any;
  state = {
    mapType: 'standard',
    markers: null,
    latlons: null,
    region: null
  };

  componentDidMount() {
    const markers = this.props.itemLocations.map((item: any) => {
      return {
        title: item.name,
        coordinate: {
          latitude: item.location.lat,
          longitude: item.location.lon
        }
      };
    });
    this.setState({ markers });
    this.setState({ latlons: markers.map((m: any) => m.coordinate) });
  }

  renderBack = () => {
    return (
      <TouchableOpacity
        onPress={() => this.props.hideMapModal()}
        style={{
          position: 'absolute',
          top: 44,
          left: rtlos() === 3 ? undefined : 5,
          right: rtlos() === 3 ? 5 : undefined,
          zIndex: 160,
          width: 34,
          height: 34,
          borderRadius: 17,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: '#fff',
          borderWidth: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Ionicons
          style={{ left: 0, bottom: rtlos() === 3 ? undefined : 3 }}
          name="ios-close"
          size={36}
          color="#fff"
        />
      </TouchableOpacity>
    );
  };

  renderType = (type: any) => {
    return (
      <TouchableOpacity
        style={{
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
          this.setMapType(type);
        }}
      >
        <Text style={{ color: '#fff' }}>{type}</Text>
      </TouchableOpacity>
    );
  };

  renderMapTypesButtons = () => {
    return (
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          right: 0,
          bottom: 10,
          zIndex: 150
        }}
      >
        {this.renderType('standard')}
        {this.renderType('hybrid')}
      </View>
    );
  };

  animateToLocation = ({ latitude, longitude }: any) => {
    this.map.animateToCoordinate(
      {
        latitude,
        longitude
      },
      350
    );
  };

  renderCenter = ({ latitude, longitude }: any) => {
    const color = this.state.mapType === 'standard' ? '#777' : '#fff';
    return (
      <TouchableOpacity
        onPress={() => this.animateToLocation({ latitude, longitude })}
        style={{
          position: 'absolute',
          right: 10,
          top: 44,
          zIndex: 180
        }}
      >
        <Ionicons name="ios-locate" size={36} color={color} />
      </TouchableOpacity>
    );
  };

  setMapType = (mapType: any) => {
    this.setState({ mapType });
  };

  render() {
    const mapType: any = this.state.mapType;
    const markers: any = this.state.markers;
    const latlons: any = this.state.latlons;

    const { width, height, notModal } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ecf0f1',
          borderWidth: 1,
          borderColor: '#eee',
          borderRadius: 5,
          overflow: 'hidden'
        }}
      >
        {!notModal && this.renderBack()}
        {this.renderMapTypesButtons()}
        <MapView
          ref={mapView => {
            this.map = mapView;
          }}
          onLayout={() => {
            this.map.fitToCoordinates(latlons, {
              edgePadding: {
                top: !notModal ? 100 : 40,
                right: 40,
                bottom: !notModal ? 70 : 40,
                left: 40
              },
              animated: true
            });
          }}
          style={{
            flex: 1,
            width,
            height
          }}
          mapType={mapType}
        >
          {markers &&
            markers.map((marker: any, index: any) => {
              return (
                <Marker
                  key={marker.title}
                  coordinate={marker.coordinate}
                  title={marker.title}
                  description={marker.description}
                >
                  <Callout>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Drive
                        hideMapModal={this.props.hideMapModal}
                        latitude={marker.coordinate.latitude}
                        longitude={marker.coordinate.longitude}
                      />
                      <View
                        style={{
                          paddingHorizontal: 10,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Text style={{ textAlign: 'center' }}>
                          {marker.title}
                        </Text>
                      </View>
                    </View>
                  </Callout>
                </Marker>
              );
            })}
        </MapView>
      </View>
    );
  }
}
