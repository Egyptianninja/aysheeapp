import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MapView } from 'expo';
import { Ionicons } from '@expo/vector-icons';

const { Marker }: any = MapView;

export default class Map extends React.Component<any, any> {
  state = {
    mapType: 'standard'
  };
  renderBack = () => {
    return (
      <TouchableOpacity
        onPress={() => this.props.hideMapModal()}
        style={{
          position: 'absolute',
          top: 38,
          left: 10,
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
          style={{ left: 1, bottom: 3 }}
          name="ios-close"
          size={34}
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
          top: 30,
          zIndex: 150
        }}
      >
        {this.renderType('standard')}
        {this.renderType('hybrid')}
      </View>
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
        <MapView
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
          // showsUserLocation={true}
          mapType={mapType}
        >
          <Marker
            coordinate={{
              latitude,
              longitude
            }}
            title={title}
            description={body}
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
