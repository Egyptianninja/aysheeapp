import * as React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import BranchesMap from './BranchesMap';

class BranchesModal extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isMapModalVisible !== prevState.isMapModalVisible) {
      if (nextProps.branches !== prevState.branches) {
        return {
          isMapModalVisible: nextProps.isMapModalVisible,
          branches: nextProps.branches
        };
      } else {
        return {
          isMapModalVisible: nextProps.isMapModalVisible
        };
      }
    } else {
      return { ...prevState };
    }
  }
  constructor(props: any) {
    super(props);
    this.state = {
      isMapModalVisible: false,
      branches: []
    };
  }

  render() {
    const { hideMapModal, width, height, getCurrentLocation } = this.props;
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
          <BranchesMap
            hideMapModal={hideMapModal}
            addLocations={this.props.addLocations}
            getCurrentLocation={getCurrentLocation}
            branches={this.state.branches}
            width={width}
            height={height}
          />
        </View>
      </Modal>
    );
  }
}

export default BranchesModal;
