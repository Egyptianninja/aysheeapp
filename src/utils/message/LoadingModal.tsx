import * as React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

export default class LoadingLodal extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isLoadingModalVisible !== prevState.isLoadingModalVisible) {
      return { isLoadingModalVisible: nextProps.isLoadingModalVisible };
    } else {
      return { ...prevState };
    }
  }
  timer: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isLoadingModalVisible: false
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { hideLoadingModal } = this.props;
    if (this.state.isLoadingModalVisible) {
      this.timer = setTimeout(() => {
        hideLoadingModal();
      }, 1800);
    }

    return (
      <Modal
        isVisible={this.state.isLoadingModalVisible}
        backdropOpacity={0.5}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ margin: 0 }}
      >
        <View
          style={{
            flex: 1,
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ddd'
          }}
        />
      </Modal>
    );
  }
}
