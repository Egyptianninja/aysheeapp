import * as React from 'react';
import { Dimensions, View, TouchableOpacity, Modal } from 'react-native';
// import Modal from 'react-native-modal';
import { Constants } from 'expo';
const { width, height } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { LoadingView } from '../../lib';
import { ImageViewer } from '../../utils';

export default class PhotoModal extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isPhotoModalVisible !== prevState.isPhotoModalVisible) {
      return { isPhotoModalVisible: nextProps.isPhotoModalVisible };
    } else {
      return { ...prevState };
    }
  }
  constructor(props: any) {
    super(props);
    this.state = {
      isPhotoModalVisible: false
    };
  }

  render() {
    return (
      <Modal
        visible={this.state.isPhotoModalVisible}
        // onBackdropPress={() => this.props.hidePhotoModal()}
        // onBackButtonPress={() => this.props.hidePhotoModal()}
        // useNativeDriver={true}
        // backdropOpacity={0}
        transparent={true}
        // hideModalContentWhileAnimating={true}
        // style={{ margin: 0 }}
      >
        <ImageViewer
          imageUrls={[this.props.photo]}
          index={this.state.imageIndex}
          loadingRender={() => <LoadingView width={width} height={height} />}
          enableSwipeDown={true}
          swipeDownThreshold={16}
          // flipThreshold={60}
          doubleClickInterval={240}
          backgroundColor="rgba(0, 0, 0, 0.9)"
          // pageAnimateTime={180}
          saveToLocalByLongPress={false}
          onSwipeDown={() => this.props.hidePhotoModal()}
          renderIndicator={() => <View />}
        />
        <TouchableOpacity
          onPress={() => this.props.hidePhotoModal()}
          style={{
            position: 'absolute',
            right: 20,
            top: Constants.statusBarHeight + 6,
            paddingHorizontal: 20
          }}
        >
          <Ionicons name="ios-close" size={40} color="#fff" />
        </TouchableOpacity>
      </Modal>
    );
  }
}
