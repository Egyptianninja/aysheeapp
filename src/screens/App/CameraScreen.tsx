import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { Camera, Permissions, Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
export default class CameraScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  camera: any;
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.off,
    images: []
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera && this.state.images.length < 6) {
      const photo = await this.camera.takePictureAsync({
        // quality: 0.8
        // base64: true
      });
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

  renderImages = () => {
    return this.state.images.map((img: any) => {
      return (
        <View
          key={img.uri}
          style={{
            width: 50,
            height: 67,
            margin: 2,
            borderColor: '#aaa',
            borderWidth: 1
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

  render() {
    const { hasCameraPermission } = this.state;
    const lang = this.props.navigation.getParam('lang');
    const ardroid = Platform.OS === 'android' && lang === 'ar';

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#000" barStyle="dark-content" />
          <TouchableOpacity
            onPress={() => this.back()}
            style={{
              position: 'absolute',
              top: 15,
              left: ardroid ? undefined : 20,
              right: ardroid ? 20 : undefined,
              zIndex: 860,
              width: 30,
              height: 40,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Ionicons name="ios-arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({
                flash:
                  this.state.flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
              });
            }}
            style={{
              position: 'absolute',
              top: 18,
              right: ardroid ? undefined : 35,
              left: ardroid ? 35 : undefined,
              zIndex: 860,
              width: 30,
              height: 40,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Ionicons
              name={
                this.state.flash === Camera.Constants.FlashMode.off
                  ? 'ios-flash-off'
                  : 'ios-flash'
              }
              size={26}
              color="#fff"
            />
          </TouchableOpacity>

          <View
            style={{
              width,
              height: Constants.statusBarHeight + 30,
              backgroundColor: '#000'
            }}
          />
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ width, height: width * 1.333 }}
            type={this.state.type}
            flashMode={this.state.flash}
            ratio="4:3"
            autoFocus="on"
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                this.snap();
              }}
              style={{ paddingBottom: 25, zIndex: 100 }}
            >
              <Ionicons name="ios-radio-button-off" size={86} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: 'absolute',
                padding: 15,
                top: -35,
                right: ardroid ? undefined : 50,
                left: ardroid ? 50 : undefined
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                });
              }}
            >
              <Ionicons name="ios-reverse-camera" size={46} color="#fff" />
            </TouchableOpacity>
            <View
              style={{
                top: -40,
                width: '100%',
                height: 75,
                flexDirection: ardroid ? 'row-reverse' : 'row',
                backgroundColor: '#000',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              {this.renderImages()}
              <TouchableOpacity
                onPress={() => {
                  this.proceed();
                }}
                style={{ padding: 5 }}
              >
                <Ionicons name="md-attach" size={33} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}
