import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  Slider,
  ScrollView,
  Animated,
  Easing,
  CameraRoll
} from 'react-native';
import Modal from 'react-native-modal';
import { Camera, Permissions, ImageManipulator, Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import PhotoSlider from '../../componenets/Camera/PhotoSlider';
import { Orientation } from '../../utils';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEGHT = Dimensions.get('window').height;

export default class CameraScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  timer: any;
  spinValue = new Animated.Value(0);
  camera: any;
  state = {
    isModalVisible: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.auto,
    images: [],
    orientation: null,
    zoom: 0,
    position: 0,
    saved: false
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentWillUnmount = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = 0;
    }
  };

  takeImage = async (deg?: any) => {
    this.timer = setTimeout(() => this.setState({ isTakingImage: true }), 1);
    let image = await this.camera.takePictureAsync({
      skipProcessing: true
    });
    if (deg) {
      image = await ImageManipulator.manipulateAsync(image.uri, [
        { rotate: deg }
      ]);
    }
    const images: any = this.state.images;
    images.push(image);
    this.setState({ images });
    this.setState({ isTakingImage: false });
  };

  snap = async () => {
    const { orientation } = this.state;
    orientation === 'll'
      ? this.takeImage(-90)
      : orientation === 'lr'
      ? this.takeImage(90)
      : this.takeImage();
  };

  proceed = async () => {
    await this.props.navigation.state.params.returnData(this.state.images);
    this.props.navigation.goBack();
  };
  back = async () => {
    this.props.navigation.state.params.returnData([]);
    this.props.navigation.goBack();
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  getPhotoPosition = (position: any) => {
    this.setState({ position });
  };

  renderSliderImages = (images: any) => {
    return (
      <PhotoSlider
        getPhotoPosition={this.getPhotoPosition}
        photos={images}
        width={SCREEN_WIDTH - 40}
        ratio={1.3333}
        showModal={this.toggleModal}
      />
    );
  };

  renderImages = () => {
    return this.state.images.map((img: any, i: any) => {
      return (
        <View
          key={img.uri}
          style={{
            position: 'absolute',
            width: 55,
            height: 55,
            left: i * 8 + 20,
            top: i * 4 + 20,
            borderColor: '#fff',
            borderRadius: 7,
            borderWidth: 1,
            overflow: 'hidden'
          }}
        >
          <Image
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              resizeMode: 'cover'
            }}
            source={{ uri: img.uri }}
          />
        </View>
      );
    });
  };

  change = (zoom: any) => {
    this.setState(() => {
      return {
        zoom: parseFloat(zoom)
      };
    });
  };

  orientation = async (orientation: any) => {
    await this.setState({ orientation });
    if (orientation === 'pu') {
      this.spinIcon(0);
    } else if (orientation === 'll') {
      this.spinIcon(1);
    } else if (orientation === 'lr') {
      this.spinIcon(-1);
    }
  };

  spinIcon = (side: any) => {
    Animated.timing(this.spinValue, {
      toValue: side,
      duration: 500,
      easing: Easing.linear
    }).start();
  };

  savePhotos = async (images: any) => {
    images.map(async (image: any) => {
      await CameraRoll.saveToCameraRoll(image.uri, 'photo');
    });
    this.setState({ saved: true });
  };

  render() {
    const { hasCameraPermission } = this.state;
    const lang = this.props.navigation.getParam('lang');
    const ardroid = Platform.OS === 'android' && lang === 'ar';

    const spin = this.spinValue.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: ['-90deg', '0deg', '90deg']
    });

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <StatusBar backgroundColor="#000" barStyle="dark-content" />
          <Orientation accuracy={0.8} orientation={this.orientation} />
          <View
            style={{
              width: '100%',
              height: Constants.statusBarHeight + 40,
              flexDirection: 'row',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: Constants.statusBarHeight,
              backgroundColor: '#000'
            }}
          >
            <TouchableOpacity
              onPress={() => this.back()}
              style={{ paddingHorizontal: 20 }}
            >
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Ionicons name="ios-arrow-back" size={30} color="#fff" />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}
              style={{ paddingHorizontal: 20 }}
            >
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Ionicons name="ios-reverse-camera" size={40} color="#fff" />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  flash:
                    this.state.flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : this.state.flash === Camera.Constants.FlashMode.on
                      ? Camera.Constants.FlashMode.auto
                      : Camera.Constants.FlashMode.off
                });
              }}
              style={{ paddingHorizontal: 20 }}
            >
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Ionicons
                  name={
                    this.state.flash === Camera.Constants.FlashMode.off
                      ? 'ios-flash-off'
                      : 'ios-flash'
                  }
                  size={26}
                  color={
                    this.state.flash === Camera.Constants.FlashMode.on
                      ? 'gold'
                      : '#fff'
                  }
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 1.3333 }}
            type={this.state.type}
            flashMode={this.state.flash}
            whiteBalance="auto"
            ratio="4:3"
            autoFocus="on"
            zoom={this.state.zoom}
          />

          <Slider
            step={0.01}
            maximumValue={0.25}
            onValueChange={this.change}
            value={this.state.zoom}
            style={{
              position: 'absolute',
              bottom: SCREEN_HEGHT / 2 - 100,
              right: SCREEN_WIDTH / 2 - 20,
              zIndex: 150,
              padding: 20,
              width: 350,
              backgroundColor: 'transparent',
              alignSelf: 'center',
              opacity: 0.8,
              transform: [
                { scaleX: 0.7 },
                { scaleY: 0.7 },
                { rotate: '-90deg' }
              ]
            }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              onPress={() => this.toggleModal()}
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                alignSelf: 'flex-start'
              }}
            >
              <Text
                style={{ color: '#fff', alignSelf: 'flex-end', padding: 10 }}
              >
                {this.state.images.length}
              </Text>
              {this.renderImages()}
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.snap();
                }}
                style={{ padding: 10 }}
                disabled={!(this.state.images.length < 6)}
              >
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      backgroundColor: '#000',
                      borderRadius: 40,
                      borderWidth: 5,
                      borderColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Ionicons name="ios-camera" size={55} color="#fff" />
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.proceed();
                }}
              >
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <Ionicons name="ios-return-right" size={65} color="#fff" />
                </Animated.View>
              </TouchableOpacity>
              {this.state.images.length > 0 && !this.state.saved && (
                <TouchableOpacity
                  onPress={async () => this.savePhotos(this.state.images)}
                  style={{ paddingHorizontal: 5 }}
                >
                  <Animated.View style={{ transform: [{ rotate: spin }] }}>
                    <Ionicons name="ios-save" size={26} color="#fff" />
                  </Animated.View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Modal
            isVisible={this.state.isModalVisible}
            onBackdropPress={() => this.setState({ isModalVisible: false })}
            backdropOpacity={0.7}
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={{ flex: 1 }}
          >
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                margin: 0,
                height: SCREEN_HEGHT - 120,
                width: SCREEN_WIDTH - 40,
                justifyContent: 'space-around',
                alignItems: 'center'
              }}
            >
              <ScrollView>
                {this.renderSliderImages(this.state.images)}
                <View
                  style={{
                    flex: 1,
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: '#7678ED'
                  }}
                >
                  <TouchableOpacity
                    onPress={async () => {
                      const images = this.state.images;
                      if (this.state.images.length === 1) {
                        this.setState({
                          images: [],
                          position: 0,
                          isModalVisible: false
                        });
                      }
                      images.splice(this.state.position, 1);
                      await this.setState({ images });
                      if (this.state.position === images.length) {
                        if (images.length === 0) {
                          await this.setState({
                            position: 0
                          });
                        } else {
                          await this.setState({
                            position: this.state.position - 1
                          });
                        }
                      }
                    }}
                    style={{ paddingHorizontal: 10 }}
                  >
                    <Ionicons name="ios-remove-circle" size={33} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      const currentImage: any = this.state.images[
                        this.state.position
                      ];
                      const image = await ImageManipulator.manipulateAsync(
                        currentImage.uri,
                        [{ rotate: 90 }]
                      );
                      const images: any = this.state.images;
                      images.splice(this.state.position, 1, image);
                      this.setState({ images });
                    }}
                    style={{ paddingHorizontal: 10 }}
                  >
                    <Ionicons name="ios-refresh" size={33} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({ isModalVisible: false })}
                    style={{ paddingHorizontal: 10 }}
                  >
                    <Ionicons
                      name="ios-checkmark-circle"
                      size={33}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </View>
      );
    }
  }
}
