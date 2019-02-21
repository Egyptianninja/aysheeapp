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
  ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import { Camera, Permissions, Constants } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import PhotoSlider from '../../componenets/Camera/PhotoSlider';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEGHT = Dimensions.get('window').height;

export default class CameraScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  camera: any;
  state = {
    isModalVisible: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.auto,
    images: [],
    zoom: 0
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera && this.state.images.length < 6) {
      const photo = await this.camera.takePictureAsync({});
      const images: any = this.state.images;
      images.push(photo);
      this.setState({ images });
    }
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

  renderSliderImages = (images: any) => {
    return (
      <PhotoSlider
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

  render() {
    console.log(this.state.images);

    const { hasCameraPermission } = this.state;
    const lang = this.props.navigation.getParam('lang');
    const ardroid = Platform.OS === 'android' && lang === 'ar';
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <StatusBar backgroundColor="#000" barStyle="dark-content" />
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
              <Ionicons name="ios-arrow-back" size={30} color="#fff" />
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
              <Ionicons name="ios-reverse-camera" size={40} color="#fff" />
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
            </TouchableOpacity>
          </View>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 1.3333 }}
            type={this.state.type}
            flashMode={this.state.flash}
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
              bottom: 100,
              zIndex: 100,
              width: 250,
              backgroundColor: 'transparent',
              alignSelf: 'center'
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
                style={{ paddingHorizontal: 20 }}
              >
                <Ionicons name="ios-radio-button-on" size={86} color="#fff" />
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
                style={{ paddingHorizontal: 20 }}
              >
                <Ionicons name="ios-share-alt" size={40} color="#fff" />
              </TouchableOpacity>
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
                // backgroundColor: 'red',
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
                    onPress={() => this.setState({ isModalVisible: false })}
                    style={{ paddingHorizontal: 20 }}
                  >
                    <Ionicons name="ios-close-circle" size={33} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      //
                    }}
                    style={{ paddingHorizontal: 20 }}
                  >
                    <Ionicons name="ios-refresh" size={33} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.setState({ isModalVisible: false })}
                    style={{ paddingHorizontal: 20 }}
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
