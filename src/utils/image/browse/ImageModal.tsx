import * as React from 'react';
import { View } from 'react-native';

import Modal from 'react-native-modal';
import ImageBrowser from './browseImage/ImageBrowser';

class ImageModal extends React.PureComponent<any, any> {
  handleChange = (value: any) => {
    this.props.onChange(this.props.name, value);
  };

  handleTouch = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    return (
      <Modal
        isVisible={this.props.isPhotoModalVisible}
        onBackdropPress={() => this.setState({ isPhotoModalVisible: false })}
        onBackButtonPress={() => this.setState({ isPhotoModalVisible: false })}
        backdropOpacity={0.5}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <ImageBrowser
            max={6 - this.props.imgqty}
            callback={this.props.imageBrowserCallback}
          />
        </View>
      </Modal>
    );
  }
}

export default ImageModal;
