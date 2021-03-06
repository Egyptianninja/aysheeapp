import * as React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { PhotoPicker } from '../../../componenets/Add/photoPicker';
import { addPermission } from '../../../store/actions/globActions';
import { getCameraRollPermission } from '../../camera';
import ImageModal from './ImageModal';

class ImagePicker extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      photos: [],
      imageBrowserOpen: false,
      isPhotoModalVisible: false,
      selectedImage: 0,
      imgqty: 0
    };
  }

  componentDidMount() {
    this.setState({ imgqty: this.props.imgqty });
  }

  togglePhotoModal = () =>
    this.setState({ isModalVisible: !this.state.isPhotoModalVisible });

  pickImage = async () => {
    const getCameraRoll = await getCameraRollPermission();
    if (getCameraRoll) {
      this.setState({ imageBrowserOpen: true });
      this.setState({ isPhotoModalVisible: true });
    }
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
          imgqty={this.props.imgqty}
          qty={this.props.qty}
          imageBrowserCallback={this.imageBrowserCallback}
          isPhotoModalVisible={this.state.isPhotoModalVisible}
        />
      </View>
    );
  }
}

export default connect(
  null,
  { addPermission }
)(ImagePicker);
