import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MapView, Constants } from 'expo';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'expo-core';

const { Marker }: any = MapView;
const types = ['standard', 'satellite', 'hybrid', 'terrain'];
class MultiLocations extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isMapModalVisible !== prevState.isMapModalVisible) {
      return {
        isMapModalVisible: nextProps.isMapModalVisible
      };
    } else {
      return { ...prevState };
    }
  }
  timerHandle: any;
  map: any;
  state = {
    isMapModalVisible: false,
    granted: false,
    userLocation: {
      latitude: 0,
      longitude: 0
    },
    markers: null,
    latlons: null,
    mapType: 'standard'
  };

  componentDidMount() {
    const { posts } = this.props;
    const filterPosts = posts.filter((post: any) => post.trueLocation);
    const markers = filterPosts.map((post: any) => {
      return {
        id: post.id,
        title: post.title,
        description: post.body,
        coordinate: {
          latitude: post.trueLocation.lat,
          longitude: post.trueLocation.lon
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
          top: 80,
          left: 10,
          zIndex: 160,
          width: 60,
          height: 60,
          borderRadius: 16,
          justifyContent: 'flex-start'
        }}
      >
        <Ionicons name="ios-close-circle" size={33} color="#777" />
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
          marginLeft: 5,
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
          left: 0,
          bottom: 0,
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
    const markers: any = this.state.markers;
    const latlons: any = this.state.latlons;
    const mapType: any = this.state.mapType;
    return (
      <Modal
        isVisible={this.state.isMapModalVisible}
        onBackdropPress={() => this.props.hideMapModal()}
        onBackButtonPress={() => this.props.hideMapModal()}
        backdropOpacity={0.6}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ margin: 0 }}
      >
        {this.renderBack()}
        <View
          style={{
            backgroundColor: '#f3f3f3',
            position: 'absolute',
            top:
              Platform.OS === 'android' ? 40 : Constants.statusBarHeight + 40,
            bottom: 0,
            margin: 0,
            width: this.props.width,
            height: this.props.height - (Constants.statusBarHeight + 40)
          }}
        >
          <MapView
            ref={mapView => {
              this.map = mapView;
            }}
            initialRegion={{
              latitude: this.props.latitude,
              longitude: this.props.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
            style={{
              alignSelf: 'stretch',
              height: this.props.height,
              width: this.props.width
            }}
            mapType={mapType}
            onLayout={() =>
              this.map.fitToCoordinates(latlons, {
                edgePadding: { top: 30, right: 30, bottom: 30, left: 30 },
                animated: false
              })
            }
          >
            {markers &&
              markers.map((marker: any) => (
                <Marker
                  key={marker.id}
                  coordinate={marker.coordinate}
                  title={marker.title}
                  description={marker.description}
                />
              ))}
          </MapView>
          {this.renderMapTypesButtons()}
        </View>
      </Modal>
    );
  }
}

export default MultiLocations;
