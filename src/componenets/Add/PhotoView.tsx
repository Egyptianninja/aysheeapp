import * as React from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { ImagePicker as ImageAlbumPicker } from '../../utils';
import { PhotoPicker } from './photoPicker';
import Modal from 'react-native-modal';
import { ImageManipulator } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import PhotoSlider from '../../componenets/Camera/PhotoSlider';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEGHT = Dimensions.get('window').height;
class PhotoView extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (
      nextProps.images !== prevState.images ||
      nextProps.selectedImage !== prevState.selectedImage
    ) {
      return {
        images: nextProps.images,
        selectedImage: nextProps.selectedImage
      };
    } else {
      return { ...prevState };
    }
  }
  state = {
    selectedImage: null,
    isModalVisible: false,
    position: 0,
    images: []
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
        selectedImage={this.state.selectedImage}
        position={this.state.position}
        setPhotoPosition={this.getPhotoPosition}
        photos={images}
        width={SCREEN_WIDTH - 40 - 10}
        ratio={1.3333}
        showModal={this.toggleModal}
      />
    );
  };

  renderImages = () => {
    return (
      <View
        style={{
          flex: 1,
          width: SCREEN_WIDTH - 40,
          flexWarp: 'warp',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexWrap: 'wrap'
        }}
      >
        {this.state.images.map((img: any, i: any) => {
          const uri = img.file ? img.file : img.uri;
          const size = (SCREEN_WIDTH - 70) / 3;
          const main = img === this.state.selectedImage;
          return (
            <TouchableOpacity
              onPress={() => {
                this.setState({ position: i });
                this.toggleModal();
              }}
              key={uri}
              style={{
                width: size,
                height: size,
                margin: 5,
                borderColor: main ? '#7678ED' : undefined,
                borderWidth: main ? 5 : 0
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover'
                }}
                source={{ uri }}
              />

            </TouchableOpacity>
          );
        })}
        <View />
      </View>
    );
  };
  render() {
    const { word, lang, returnData, pickCameraImage } = this.props;
    return (
      <React.Fragment>
        <View style={{ flexDirection: 'row' }}>
          <ImageAlbumPicker
            label={word.photos}
            lang={lang}
            sublabel={word.subphotos}
            returnData={returnData}
            width={SCREEN_WIDTH}
          />
          <PhotoPicker
            icon="ios-camera"
            label={word.photos}
            pickImage={pickCameraImage}
            width={SCREEN_WIDTH}
            lang={lang}
            sublabel={word.subphotos}
          />
        </View>
        {this.state.images.length > 0 && this.renderImages()}
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
                      this.props.updateImagesList([]);
                      this.setState({
                        position: 0,
                        isModalVisible: false
                      });
                    }
                    images.splice(this.state.position, 1);
                    this.props.updateImagesList(images);
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
                  <Ionicons name="ios-trash" size={33} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    const currentImage: any = this.state.images[
                      this.state.position
                    ];
                    const uri = currentImage.file
                      ? currentImage.file
                      : currentImage.uri;
                    const image = await ImageManipulator.manipulateAsync(uri, [
                      { rotate: 90 }
                    ]);
                    const images: any = this.state.images;
                    images.splice(this.state.position, 1, image);
                    this.props.updateImagesList(images);
                  }}
                  style={{ paddingHorizontal: 10 }}
                >
                  <Ionicons name="ios-refresh" size={33} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const currentImage: any = this.state.images[
                      this.state.position
                    ];
                    this.props.hendleSelectedImage(currentImage);
                  }}
                  style={{ paddingHorizontal: 10 }}
                >
                  <Ionicons name="ios-image" size={33} color="#fff" />
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
      </React.Fragment>
    );
  }
}
export default PhotoView;
