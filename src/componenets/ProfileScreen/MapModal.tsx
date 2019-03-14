import * as React from 'react';
import Modal from 'react-native-modal';
import Map from './Map';
import { View } from 'react-native';

class MapModal extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isMapModalVisible !== prevState.isMapModalVisible) {
      return {
        isMapModalVisible: nextProps.isMapModalVisible
      };
    } else {
      return { ...prevState };
    }
  }
  constructor(props: any) {
    super(props);
    this.state = {
      isMapModalVisible: false
    };
  }

  render() {
    const { lat, lon, title, hideMapModal, width, height } = this.props;
    return (
      <Modal
        isVisible={this.state.isMapModalVisible}
        onBackdropPress={() => hideMapModal()}
        backdropOpacity={0.6}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        // onSwipe={() => hideMapModal()}
        // swipeDirection="down"
        style={{ justifyContent: 'center', margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            position: 'absolute',
            bottom: height / 2 - 250,
            margin: 0,
            height: 500,
            width,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <Map latitude={lat} longitude={lon} title={title} width={width} />
        </View>
      </Modal>
    );
  }
}

export default MapModal;
