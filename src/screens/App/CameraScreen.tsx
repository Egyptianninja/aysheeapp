import * as React from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Camera, Permissions } from 'expo';
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
            height: 70,
            margin: 4,
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
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => this.back()}
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              zIndex: 860,
              width: 42,
              height: 45,
              borderRadius: 16,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10
            }}
          >
            <Ionicons name="ios-arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ width, height: width * 1.7778 }}
            type={this.state.type}
            flashMode={this.state.flash}
            ratio="16:9"
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent'
              }}
            >
              <View
                style={{
                  flex: 2,
                  alignItems: 'flex-end',
                  paddingHorizontal: 20,
                  justifyContent: 'flex-end',
                  flexDirection: 'row'
                }}
              >
                <TouchableOpacity
                  style={{ padding: 15, paddingBottom: 20 }}
                  onPress={() => {
                    this.setState({
                      flash:
                        this.state.flash === Camera.Constants.FlashMode.off
                          ? Camera.Constants.FlashMode.on
                          : Camera.Constants.FlashMode.off
                    });
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
                <TouchableOpacity
                  style={{ padding: 15 }}
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                    });
                  }}
                >
                  <Ionicons name="ios-reverse-camera" size={36} color="#fff" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 10
                }}
              />
              <View
                style={{
                  flex: 4.5,
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.snap();
                  }}
                >
                  <Ionicons
                    name="ios-radio-button-off"
                    size={86}
                    color="#fff"
                  />
                </TouchableOpacity>
                <View
                  style={{
                    width: '100%',
                    height: 75,
                    flexDirection: 'row'
                  }}
                >
                  {this.renderImages()}
                  <TouchableOpacity
                    onPress={() => {
                      this.proceed();
                    }}
                    style={{ padding: 5 }}
                  >
                    <Ionicons name="md-attach" size={36} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
