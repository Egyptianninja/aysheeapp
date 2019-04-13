import { Ionicons } from '@expo/vector-icons';
import { MapView } from 'expo';
import * as React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';

const { Marker }: any = MapView;

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

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
  index: any;
  animation: any;
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
        post,
        title: post.title,
        description: post.body,
        coordinate: {
          latitude: post.trueLocation.lat,
          longitude: post.trueLocation.lon
        },
        image: post.uri,
        price: post.price
      };
    });
    this.setState({ markers });
    this.setState({ latlons: markers.map((m: any) => m.coordinate) });
    this.index = 0;
    this.animation = new Animated.Value(0);

    this.animation.addListener(({ value }: any) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }
    });
  }
  componentWillUnmount() {
    this.animation.removeAllListeners();
  }

  renderBack = () => {
    return (
      <TouchableOpacity
        onPress={() => this.props.hideMapModal()}
        style={{
          position: 'absolute',
          top: 40,
          left: 10,
          zIndex: 160,
          width: 40,
          height: 40,
          borderRadius: 16,
          justifyContent: 'flex-start'
        }}
      >
        <Ionicons
          name="ios-close-circle"
          size={33}
          color="rgba(0, 0, 0, 0.4)"
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
    const markers: any = this.state.markers;
    const latlons: any = this.state.latlons;
    const mapType: any = this.state.mapType;

    const interpolations = markers
      ? markers.map((marker: any, index: any) => {
          const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH
          ];
          const scale = this.animation.interpolate({
            inputRange,
            outputRange: [1, 2.5, 1],
            extrapolate: 'clamp'
          });
          const opacity = this.animation.interpolate({
            inputRange,
            outputRange: [0.35, 1, 0.35],
            extrapolate: 'clamp'
          });
          return { scale, opacity };
        })
      : undefined;
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
        {this.renderMapTypesButtons()}

        <View
          style={{
            backgroundColor: '#f3f3f3',
            position: 'absolute',
            margin: 0,
            width,
            height
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
              left: 0,
              top: 0,
              height,
              width
            }}
            mapType={mapType}
            onLayout={() =>
              this.map.fitToCoordinates(latlons, {
                edgePadding: {
                  top: 30,
                  right: 30,
                  bottom: CARD_HEIGHT + 10,
                  left: 30
                },
                animated: true
              })
            }
          >
            {markers &&
              markers.map((marker: any, index: any) => {
                const scaleStyle = {
                  transform: [
                    {
                      scale: interpolations[index].scale
                    }
                  ]
                };
                const opacityStyle = {
                  opacity: interpolations[index].opacity
                };
                return (
                  <Marker key={index} coordinate={marker.coordinate}>
                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                      <Animated.View style={[styles.ring, scaleStyle]} />
                      <View style={styles.marker} />
                    </Animated.View>
                  </Marker>
                  // <Marker
                  //   key={marker.id}
                  //   coordinate={marker.coordinate}
                  //   title={marker.title}
                  //   description={marker.description}
                  // />
                );
              })}
          </MapView>
          <Animated.ScrollView
            horizontal
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_WIDTH}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.animation
                    }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
            style={styles.scrollView}
            contentContainerStyle={styles.endPadding}
          >
            {markers &&
              markers.map((marker: any, index: any) => (
                <TouchableOpacity
                  // TODO: link to item
                  // onPress={() =>
                  //   this.props.navigation.navigate('ItemScreen', {
                  //     post: marker.post,
                  //     word: this.props.word,
                  //     lang: this.props.lang,
                  //     isRTL: this.props.isRTL
                  //   })
                  // }
                  style={styles.card}
                  key={index}
                >
                  <Image
                    source={{ uri: marker.image }}
                    style={styles.cardImage}
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      right: 5,
                      top: 5,
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: '#26A65B',
                      paddingLeft: 5,
                      paddingBottom: 3,
                      backgroundColor: 'rgba(255, 255, 255, 1)'
                    }}
                  >
                    {marker.price.toLocaleString('en')}
                  </Text>
                  <View style={styles.textContent}>
                    <Text numberOfLines={1} style={styles.cardtitle}>
                      {marker.title}
                    </Text>
                    <Text numberOfLines={1} style={styles.cardDescription}>
                      {marker.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </Animated.ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden'
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 12,
    color: '#444'
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)'
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)'
  }
});

export default MultiLocations;
