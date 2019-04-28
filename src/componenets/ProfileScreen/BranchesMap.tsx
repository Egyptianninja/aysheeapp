import { Ionicons } from '@expo/vector-icons';
import { MapView } from 'expo';
import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import { getUserLocation, isIphoneX } from '../../utils';
import Modal from 'react-native-modal';
import LoadingTiny from '../Common/LoadingTiny';

const { Marker }: any = MapView;

export default class BranchesMap extends React.Component<any, any> {
  map: any;
  state = {
    mapType: 'standard',
    location: null,
    loading: false,
    isNameModalVisible: false,

    name: null,
    coordinate: null,
    markers: [],
    marker: null
  };

  componentDidMount() {
    this.getLocation();
    this.setState({ loading: true });
    const markers = this.props.branches.map((branch: any) => {
      return {
        name: branch.name,
        coordinate: {
          latitude: branch.location.lat,
          longitude: branch.location.lon
        }
      };
    });
    this.setState({ markers });
  }

  handlePress = (e: any) => {
    this.animateToMarker({ coordinate: e.nativeEvent.coordinate });
    this.setState({
      isNameModalVisible: true,
      coordinate: e.nativeEvent.coordinate
    });
    this.setState({
      marker: {
        coordinate: e.nativeEvent.coordinate
      }
    });
  };

  hideNameModal = () => {
    this.setState({
      isNameModalVisible: false,
      marker: null,
      name: null,
      coordinate: null
    });
  };

  handleItemDelete = (name: string) => {
    const newKarkerList = this.state.markers.filter(
      (marker: any) => marker.name !== name
    );
    this.setState({ markers: newKarkerList });
  };

  handleSubmit = () => {
    if (this.state.name) {
      this.setState({
        markers: [
          ...this.state.markers,
          {
            coordinate: this.state.coordinate,
            name: this.state.name
          }
        ]
      });
    }

    this.hideNameModal();
    this.setState({ marker: null });
  };

  getLocation = async () => {
    const location = await getUserLocation();
    if (location.coords) {
      this.props.getCurrentLocation(location);
      this.setState({ location });
      this.setState({ loading: false });
      return location;
    }
  };

  renderBack = () => {
    return (
      <TouchableOpacity
        onPress={() => this.props.hideMapModal()}
        style={{
          position: 'absolute',
          top: isIphoneX() ? 40 : 20,
          left: 5,
          zIndex: 160,
          width: 32,
          height: 32,
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
          style={{ left: 0, bottom: 1 }}
          name="ios-close"
          size={30}
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
          top: isIphoneX() ? 35 : 15,
          zIndex: 150
        }}
      >
        {this.renderType('standard')}
        {this.renderType('hybrid')}
      </View>
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

  setMapType = (mapType: any) => {
    this.setState({ mapType });
  };

  render() {
    const mapType: any = this.state.mapType;
    const location: any = this.state.location;

    const { width, height } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#f3f3f3'
        }}
      >
        {this.renderBack()}
        {this.renderMapTypesButtons()}
        {!location && <LoadingTiny size={40} />}
        {location && (
          <React.Fragment>
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
                height,
                width
              }}
              onPress={this.handlePress}
              mapType={mapType}
              showsUserLocation={true}
              userLocationAnnotationTitle="My location"
            >
              {this.state.markers.map((marker: any) => {
                return (
                  <Marker key={marker.name} {...marker}>
                    <View style={{ alignItems: 'center', bottom: 15 }}>
                      <View
                        style={{
                          bottom: 15,
                          backgroundColor: '#7678ED',
                          padding: 10,
                          borderRadius: 10
                        }}
                      >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
                          {marker.name}
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
                );
              })}
              {this.state.marker && (
                <Marker {...this.state.marker}>
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
                </Marker>
              )}
            </MapView>
            <TouchableOpacity
              onPress={async () => {
                await this.props.addLocations(this.state.markers);
                this.props.hideMapModal();
              }}
              style={{
                position: 'absolute',
                bottom: isIphoneX() ? 140 : 120,
                right: (width - 100) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#373737',
                width: 100,
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  padding: 10,
                  fontSize: 16,
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
            <ScrollView
              horizontal
              scrollEventThrottle={1}
              showsHorizontalScrollIndicator={false}
              style={{
                position: 'absolute',
                bottom: isIphoneX() ? 30 : 10,
                left: 10,
                right: 10
              }}
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {this.state.markers &&
                this.state.markers.map((marker: any, index: any) => (
                  <View
                    key={marker.name}
                    style={{
                      maxWidth: (width - 30) / 2,
                      minWidth: width / 3,
                      height: 100,
                      backgroundColor: '#fff',
                      marginRight: 10,
                      padding: 10
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.animateToMarker(marker)}
                      style={{
                        flex: 1,
                        marginVertical: 15,
                        alignItems: 'flex-start',
                        justifyContent: 'center'
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color: '#999'
                        }}
                      >
                        {marker.name}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.handleItemDelete(marker.name)}
                      style={{
                        position: 'absolute',
                        right: 10,
                        top: 0
                      }}
                    >
                      <Ionicons name="ios-close" size={30} color="#000" />
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </React.Fragment>
        )}
        <Modal
          isVisible={this.state.isNameModalVisible}
          onBackdropPress={() => this.hideNameModal()}
          onBackButtonPress={() => this.hideNameModal()}
          backdropOpacity={0.3}
          hideModalContentWhileAnimating={true}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          onSwipeComplete={() => this.hideNameModal()}
          swipeDirection="down"
          style={{ margin: 0 }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              position: 'absolute',
              top: 0,
              margin: 0,
              height: 3 * 55 + 70,
              paddingTop: 40,
              width
            }}
          >
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text
                style={{
                  marginTop: 20,
                  marginBottom: 10,
                  fontSize: 18,
                  color: '#777'
                }}
              >
                Enter branch name
              </Text>
              <TextInput
                onChangeText={(name: any) => this.setState({ name })}
                placeholder="Branch Name"
                placeholderTextColor="#ddd"
                autoFocus
                autoCorrect={false}
                style={{
                  width: 300,
                  borderRadius: 10,
                  paddingHorizontal: 15,
                  padding: 10,
                  backgroundColor: '#eee',
                  writingDirection: 'auto',
                  letterSpacing: 1,
                  fontSize: 20,
                  color: '#272727'
                  // fontWeight: 'bold'
                }}
              />
              <View
                style={{
                  padding: 30,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 100,
                    height: 40,
                    backgroundColor: '#7678ED',
                    marginHorizontal: 20,
                    borderRadius: 10
                  }}
                  onPress={() => this.handleSubmit()}
                >
                  <Text style={{ color: '#fff', fontSize: 18 }}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 98,
                    height: 38,
                    marginHorizontal: 20,
                    borderColor: '#7678ED',
                    borderWidth: 1,
                    borderRadius: 10
                  }}
                  onPress={() => this.hideNameModal()}
                >
                  <Text style={{ color: '#7678ED', fontSize: 18 }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
