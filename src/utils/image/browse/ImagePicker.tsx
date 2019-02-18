import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform
} from 'react-native';
import { Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import ImageModal from './ImageModal';

class ImagePicker extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      photos: [],
      imageBrowserOpen: false,
      isPhotoModalVisible: false,
      selectedImage: 0
    };
  }

  togglePhotoModal = () =>
    this.setState({ isModalVisible: !this.state.isPhotoModalVisible });

  pickImage = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status: existingStatus } = await Permissions.getAsync(permissions);
    let finalStatus = existingStatus;
    if (finalStatus !== 'granted') {
      const { status } = await Permissions.askAsync(permissions);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    this.setState({ imageBrowserOpen: true });
    this.setState({ isPhotoModalVisible: true });
  };

  handleSelectImage = (photo: any) => {
    this.props.hendleSelectedImage(photo);
    this.setState({ selectedImage: photo });
  };

  imageBrowserCallback = (callback: any) => {
    callback
      .then((photos: any) => {
        if (photos.length === 0) {
          this.setState({
            imageBrowserOpen: false,
            isPhotoModalVisible: false,
            photos: []
          });
        }
        // select the first one
        if (this.state.selectedImage === 0) {
          this.setState({ selectedImage: photos[0].file });
          this.handleSelectImage(photos[0].file);
        }
        // add photo list to formik
        this.props.onChange(this.props.name, photos);

        this.setState({
          imageBrowserOpen: false,
          isPhotoModalVisible: false,
          photos
        });
      })
      .catch((e: any) => console.log(e));
  };

  renderImage(photo: any, i: any) {
    return (
      <TouchableOpacity
        key={i}
        onPress={() => this.handleSelectImage(photo.file)}
      >
        <Image
          style={{
            height: width / 6 - 4,
            width: width / 6 - 4,
            margin: 2,
            borderWidth: 2,
            borderColor:
              photo.file === this.state.selectedImage ? '#e0364f' : '#eee'
          }}
          source={{ uri: photo.file }}
          key={i}
        />
      </TouchableOpacity>
    );
  }
  render() {
    const { label, error, ...rest } = this.props;

    return (
      <View>
        <View
          style={{
            paddingHorizontal: 8,
            marginBottom: 8,
            marginTop: 16,
            alignItems:
              rest.lang === 'ar' && Platform.OS !== 'android'
                ? 'flex-end'
                : 'flex-start'
          }}
        >
          <Text style={{ fontSize: 18 }}>{label}</Text>
        </View>

        <View
          style={{
            width: width - 40,
            height: 120,
            backgroundColor: '#eee',
            borderRadius: 5,
            marginBottom: 10
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            {this.state.photos.map((photo: any, i: any) =>
              this.renderImage(photo, i)
            )}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              onPress={this.pickImage}
              style={{
                flexDirection: 'row',
                flex: 2,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <Ionicons name="ios-camera" size={60} color="#fff" />
              <Text style={{ fontSize: 40, color: '#fff' }}> + </Text>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end'
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: '#777',
                  paddingHorizontal: 10
                }}
              >
                {this.props.sublabel}
              </Text>
            </View>
          </View>
          <ImageModal
            imageBrowserCallback={this.imageBrowserCallback}
            isPhotoModalVisible={this.state.isPhotoModalVisible}
          />
        </View>
      </View>
    );
  }
}

export default ImagePicker;
