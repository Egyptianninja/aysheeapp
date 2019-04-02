import { Ionicons } from '@expo/vector-icons';
import { ImageManipulator } from 'expo';
import * as React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import Modal from 'react-native-modal';
import PhotoSlider from '../../componenets/Camera/PhotoSlider';
import { ImagePicker as ImageAlbumPicker } from '../../utils';
import { PhotoPicker } from './photoPicker';
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

  setPhotoPosition = (position: any) => {
    this.setState({ position });
  };
  deleteImage = async (position: any) => {
    const images = this.state.images;
    if (this.state.images.length === 1) {
      this.props.updateImagesList([]);
      this.setState({
        position: 0,
        isModalVisible: false
      });
    }
    images.splice(position, 1);
    this.props.updateImagesList(images);
    if (position === images.length) {
      if (images.length === 0) {
        await this.setState({
          position: 0
        });
      } else {
        await this.setState({
          position: position - 1
        });
      }
    }
  };

  renderSliderImages = (images: any) => {
    return (
      <PhotoSlider
        selectedImage={this.state.selectedImage}
        position={this.state.position}
        setPhotoPosition={this.setPhotoPosition}
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
          const main = uri === this.state.selectedImage;

          return (
            <View key={uri}>
              <TouchableOpacity
                onPress={() => {
                  const currentImage: any = this.state.images[i];
                  const url = currentImage.file
                    ? currentImage.file
                    : currentImage.uri;
                  this.props.hendleSelectedImage(url);
                }}
                style={{
                  position: 'absolute',
                  zIndex: 280,
                  top: 8,
                  right: 10,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  borderColor: '#fff',
                  borderWidth: 1
                }}
              >
                <Ionicons name="ios-bookmark" size={24} color="#00B77C" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => this.deleteImage(i)}
                style={{
                  position: 'absolute',
                  zIndex: 280,
                  bottom: 8,
                  left: 10,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  borderColor: '#fff',
                  borderWidth: 1
                }}
              >
                <Ionicons name="ios-trash" size={24} color="#E85255" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ position: i });
                  this.toggleModal();
                }}
                style={{
                  width: size,
                  height: size,
                  margin: 5,
                  borderRadius: 5,
                  borderColor: main ? '#00B77C' : undefined,
                  borderWidth: main ? 5 : 0,
                  opacity: i > 5 ? 0.2 : 1
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
            </View>
          );
        })}
        <View />
      </View>
    );
  };
  render() {
    const { word, returnData, pickCameraImage, width, isRTL } = this.props;
    return (
      <React.Fragment>
        <Text
          style={{
            alignSelf: 'flex-start',
            paddingHorizontal: 45,
            color: '#777',
            paddingVertical: 20
          }}
        >
          {word.photos}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: width - 60,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            paddingVertical: 10,
            borderRadius: 20,
            marginBottom: 20
          }}
        >
          <ImageAlbumPicker
            imgqty={this.state.images.length}
            // label={word.photos}
            sublabel={word.subphotos}
            returnData={returnData}
            width={SCREEN_WIDTH}
          />
          <View style={{ height: '90%', width: 3, backgroundColor: '#eee' }} />
          <PhotoPicker
            imgqty={this.state.images.length}
            icon="ios-camera"
            // label={word.photos}
            pickImage={pickCameraImage}
            width={SCREEN_WIDTH}
            sublabel={word.subphotos}
          />
        </View>
        {this.state.images.length > 0 && this.renderImages()}
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          onBackButtonPress={() => this.setState({ isModalVisible: false })}
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
                  onPress={async () => this.deleteImage(this.state.position)}
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
                    const uri = currentImage.file
                      ? currentImage.file
                      : currentImage.uri;
                    this.props.hendleSelectedImage(uri);
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
