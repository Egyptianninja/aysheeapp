import * as React from "react";
import { View, Image } from "react-native";
import Modal from "react-native-modal";

class ImageModal extends React.Component<any, any> {
  state = {
    isModalVisible: false
  };

  showModal = () => this.setState({ isModalVisible: true });
  hideModal = () => this.setState({ isModalVisible: false });
  toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Modal
          isVisible={this.state.isModalVisible}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          useNativeDriver={true}
          backdropOpacity={0.9}
          hideModalContentWhileAnimating={true}
          scrollOffset={1}
          onBackdropPress={this.hideModal}
        >
          <View
            style={{
              width: this.props.width,
              height: this.props.height,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover"
              }}
              source={{ uri: this.props.uri }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default ImageModal;
