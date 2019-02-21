import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar,
  Slider
} from 'react-native';
import {
  Camera,
  Permissions,
  Constants,
  ScreenOrientation,
  Gyroscope
} from 'expo';
import { Ionicons } from '@expo/vector-icons';
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class CameraScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  subscription: any;
  camera: any;
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.off,
    gyroscopeData: {
      x: 0,
      y: 0,
      z: 0
    },
    landscape: false,
    images: [],
    zoom: 0
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
    this.toggle();
  }
  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    this.unsubscribe();
  }
  toggle = () => {
    if (this.subscription) {
      this.unsubscribe();
    } else {
      this.subscribe();
    }
  };

  slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  fast = () => {
    Gyroscope.setUpdateInterval(16);
  };

  round = (n: any) => {
    if (!n) {
      return 0;
    }
    return Math.floor(n * 100) / 100;
  };

  subscribe = () => {
    this.subscription = Gyroscope.addListener(result => {
      this.setState({ gyroscopeData: result });
    });
  };

  unsubscribe = () => {
    this.subscription && this.subscription.remove();
    this.subscription = null;
  };

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

  change = (zoom: any) => {
    this.setState(() => {
      return {
        zoom: parseFloat(zoom)
      };
    });
  };

  render() {
    const { hasCameraPermission } = this.state;
    const lang = this.props.navigation.getParam('lang');
    const ardroid = Platform.OS === 'android' && lang === 'ar';
    const { x, y, z } = this.state.gyroscopeData;
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
              width: SCREEN_WIDTH,
              height: Constants.statusBarHeight + 30,
              backgroundColor: '#000'
            }}
          />
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH * 1.333 }}
            type={this.state.type}
            flashMode={this.state.flash}
            ratio="4:3"
            autoFocus="on"
            zoom={this.state.zoom}
          />
          <View style={{ height: 200 }}>
            <Text>Gyroscope:</Text>
            <Text style={{ fontSize: 16, padding: 10 }}>
              x: {this.round(x) * 100}
            </Text>
            <Text style={{ fontSize: 16 }}>y: {this.round(y) * 100}</Text>
            <Text style={{ fontSize: 16 }}>z: {this.round(z) * 100}</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 5
              }}
            >
              <TouchableOpacity onPress={this.toggle}>
                <Text>Toggle</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.slow}>
                <Text>Slow</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.fast}>
                <Text>Fast</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Slider
            step={0.01}
            maximumValue={0.25}
            onValueChange={this.change}
            value={this.state.zoom}
            style={{
              position: 'absolute',
              bottom: 140,
              width: 250,
              left: SCREEN_WIDTH / 2 - 125,
              zIndex: 250,
              backgroundColor: 'transparent'
            }}
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
              style={{
                paddingBottom: 25,
                zIndex: 100
              }}
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
