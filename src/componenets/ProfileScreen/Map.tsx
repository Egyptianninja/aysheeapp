import { Ionicons } from '@expo/vector-icons';

import { MapView } from 'expo';
import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Drive from '../../utils/location/drive';
import { rtlos } from '../../utils';

const { Marker, Callout }: any = MapView;

export default class Map extends React.Component<any, any> {
  map: any;
  mymarker: any;
  state = {
    mapType: 'standard'
  };

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
          marginHorizontal: 5,
          borderColor: '#fff',
          borderWidth: 2,
          borderRadius: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
        // hitSlop={{ top: 20, bottom: 20 }}
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
    const { width, height, latitude, longitude, title, body } = this.props;
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
        {this.renderBack()}
        {this.renderMapTypesButtons()}
        {this.renderCenter({ latitude, longitude })}
        <MapView
          ref={mapView => {
            this.map = mapView;
          }}
          onMapReady={() => this.mymarker.showCallout()}
          style={{
            flex: 1,
            width,
            height
          }}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.0062,
            longitudeDelta: 0.0041
          }}
          mapType={mapType}
        >
          <Marker
            coordinate={{
              latitude,
              longitude
            }}
            title={title}
            ref={(markerView: any) => {
              this.mymarker = markerView;
            }}
          >
            <Callout
            // tooltip={true}
            >
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: 5,
                  // height: 44,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Drive
                  hideMapModal={this.props.hideMapModal}
                  latitude={latitude}
                  longitude={longitude}
                />
                <View
                  style={{
                    width: 150,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ textAlign: 'center' }}>{title}</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        </MapView>
      </View>
    );
  }
}
