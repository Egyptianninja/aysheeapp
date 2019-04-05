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
        onBackButtonPress={() => hideMapModal()}
        backdropOpacity={0.6}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{ justifyContent: 'center', margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#f3f3f3',
            position: 'absolute',
            margin: 0,
            width,
            height
          }}
        >
          <Map
            hideMapModal={hideMapModal}
            latitude={lat}
            longitude={lon}
            title={title}
            width={width}
            height={height}
          />
        </View>
      </Modal>
    );
  }
}

export default MapModal;
