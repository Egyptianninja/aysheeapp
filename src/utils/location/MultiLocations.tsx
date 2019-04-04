import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MapView, Constants } from 'expo';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

const { Marker }: any = MapView;

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
    latlons: null
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

  render() {
    const markers: any = this.state.markers;
    const latlons: any = this.state.latlons;
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
            top: Constants.statusBarHeight + 40,
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
            onLayout={() =>
              this.map.fitToCoordinates(latlons, {
                edgePadding: { top: 30, right: 30, bottom: 30, left: 30 },
                animated: false
              })
            }
            showsUserLocation={true}
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
        </View>
      </Modal>
    );
  }
}

export default MultiLocations;
