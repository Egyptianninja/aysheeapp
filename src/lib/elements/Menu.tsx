import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");

export default class Menu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalVisible: false
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  renderOptions = (data: any) => {
    return data.map((da: any) => {
      return (
        <Option
          key={da.id}
          toggleModal={this.toggleModal}
          onSelect={this.props.onSelect}
          width={width}
          itemData={da}
          {...this.props}
        />
      );
    });
  };

  render() {
    const { isrtl, post } = this.props;

    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={() => this.toggleModal()}
          style={{
            position: "absolute",
            left: post.imageWidth - 40,
            paddingHorizontal: 5,
            paddingLeft: isrtl ? undefined : 15,
            paddingRight: isrtl ? 15 : undefined,
            zIndex: 100
          }}
        >
          <Ionicons name="md-more" size={26} color="#aaa" />
        </TouchableOpacity>

        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          backdropOpacity={0.2}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          style={{ flex: 1 }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 10,
              position: "absolute",
              bottom: 0,
              margin: 0,
              height: 350,
              paddingTop: 10,
              width: width - 40,
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >
            <ScrollView>{this.renderOptions(this.props.data)}</ScrollView>
          </View>
        </Modal>
      </React.Fragment>
    );
  }
}

const Option = ({
  itemData,
  toggleModal,
  lang,
  editClassifieds,
  post
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (itemData.id === 1) {
          if (post.updates) {
            editClassifieds({
              variables: {
                postId: post.id,
                updates: post.updates + 1
              }
            });
          } else {
            editClassifieds({
              variables: {
                postId: post.id,
                updates: 1
              }
            });
          }
        }
        toggleModal();
      }}
      style={{
        flex: 1,
        width: width - 80,
        padding: 3,
        margin: 7,
        backgroundColor: "#eee",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontFamily: "cairo-regular",
          textAlign: lang === "ar" ? "right" : "left",
          paddingHorizontal: 10
        }}
      >
        {itemData.name}
      </Text>
    </TouchableOpacity>
  );
};
