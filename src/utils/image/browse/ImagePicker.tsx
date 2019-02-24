import * as React from 'react';
import { View } from 'react-native';
import { Permissions } from 'expo';
import ImageModal from './ImageModal';
import { PhotoPicker } from '../../../componenets/Add/photoPicker';

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
        this.props.returnData(photos);
        this.setState({
          imageBrowserOpen: false,
          isPhotoModalVisible: false,
          photos
        });
      })
      .catch((e: any) => console.log(e));
  };

  render() {
    const { label, width } = this.props;

    return (
      <View>
        <PhotoPicker
          icon="ios-images"
          label={label}
          pickImage={this.pickImage}
          width={width}
        />
        <ImageModal
          imageBrowserCallback={this.imageBrowserCallback}
          isPhotoModalVisible={this.state.isPhotoModalVisible}
        />
      </View>
    );
  }
}

export default ImagePicker;
