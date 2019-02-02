import * as React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView
} from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { FilterOption } from "./FilterOption";
const { width } = Dimensions.get("window");

export default class FilterSelect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalVisible: false,
      label: null
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  componentWillMount() {
    this.setState({ label: this.props.data.label });
  }
  handleLabel = (label: any) => {
    this.setState({ label });
  };
  renderOptions = (data: any) => {
    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={() => {
            const { itemKind, removeFilter } = this.props;
            removeFilter(itemKind);
            if (itemKind === "brandId") {
              removeFilter("subBrandId");
            }
            if (itemKind === "kindId") {
              removeFilter("eBrandId");
              removeFilter("brandId");
              removeFilter("subBrandId");
            }
            this.handleLabel(this.props.data.label);
            this.toggleModal();
          }}
          style={{
            flex: 1,
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
              fontSize: 16,
              fontFamily: "cairo-regular",
              textAlign: this.props.lang === "ar" ? "right" : "left",
              paddingHorizontal: 10,
              color: "#ff5959"
            }}
          >
            {this.props.words.remove}
          </Text>
        </TouchableOpacity>
        {data.buckets.map((da: any) => {
          return (
            <FilterOption
              lang={this.props.lang}
              key={da.id}
              toggleModal={this.toggleModal}
              handleLabel={this.handleLabel}
              onChange={this.props.onChange}
              width={width}
              itemData={da}
              {...this.props}
            />
          );
        })}
      </React.Fragment>
    );
  };

  render() {
    let data = this.props.data;

    if (this.props.pid) {
      if (this.props.pid.id || this.props.pid.id === 0) {
        const { id, label, name } = this.props.pid;
        const buckets = data.buckets.filter((sb: any) => sb.pid === id);
        data = { buckets, label, name };
      }
    }
    const { rest, itemKind } = this.props;
    const selected =
      rest[itemKind] || rest[itemKind] === 0 || rest[itemKind] === false;
    const selectedLable =
      rest[itemKind] &&
      rest[itemKind] !== 0 &&
      rest[itemKind] !== false &&
      rest[itemKind] !== true;

    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            padding: 4,
            paddingLeft: 2,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 7,
            marginVertical: 5,
            borderWidth: 1,
            borderColor: "#D7E7F3",
            shadowOffset: { width: 2, height: 2 },
            shadowColor: "#666",
            shadowRadius: 3,
            shadowOpacity: 0.2,
            // borderRadius: 17,
            borderRadius: 5,
            backgroundColor: this.props.disable ? "#eee" : "#fff"
          }}
          onPress={this.props.disable ? () => null : () => this.toggleModal()}
        >
          {this.props.icon && (
            <Ionicons
              name={this.props.icon}
              size={22}
              color={selected ? "#6FA7D5" : "#777"}
              style={{ margin: 5 }}
            />
          )}
          {!this.props.icon && (
            <Ionicons
              name="ios-arrow-down"
              size={22}
              color={selected ? "#6FA7D5" : "#777"}
              style={{ margin: 5 }}
            />
          )}
          <Text
            style={{
              color: selected ? "#6FA7D5" : "#777",
              fontSize: this.props.lang === "ar" ? 14 : 15,
              fontFamily: "cairo-regular",
              paddingHorizontal: this.props.icon ? undefined : 5
            }}
          >
            {selectedLable
              ? // ? `${data.label} - ${this.state.label}`
                `${this.state.label}`
              : this.props.icon || !this.props.rest[itemKind]
              ? data.label
              : this.state.label}
          </Text>
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
            <ScrollView>{this.renderOptions(data)}</ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
