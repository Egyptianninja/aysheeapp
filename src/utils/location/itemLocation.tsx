import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, rtlos } from '../common';
import { MapView } from 'expo';

const { Marker }: any = MapView;

export default class ItemLocation extends React.Component<any, any> {
  map: any;

  animateToCenter = () => {
    this.map.animateToCoordinate(
      {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      },
      350
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.animateToCenter()}
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
        <MapView
          style={{
            alignSelf: 'stretch',
            height: 200,
            width: this.props.width - 40
          }}
          region={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.0062,
            longitudeDelta: 0.0041
          }}
          ref={mapView => {
            this.map = mapView;
          }}
          // showsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: this.props.latitude,
              longitude: this.props.longitude
            }}
            title={this.props.title}
            description={this.props.body}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: 'rgba(223, 57, 66,0.1)',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'rgba(223, 57, 66, 0.5)',
                borderWidth: 1
              }}
            >
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: 'rgba(223, 57, 66, 1)'
                }}
              />
            </View>
          </Marker>
        </MapView>
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
    marginHorizontal: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: '#D9DAFA',
    borderWidth: 2,
    overflow: 'hidden'
  }
});
