import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import FilterOption from './FilterOption';
import { Platform } from 'expo-core';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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
    if (!this.state.lable) {
      this.setState({ label: this.props.data.label });
    }
  }
  handleLabel = (label: any) => {
    this.setState({ label });
  };
  renderOptions = (data: any) => {
    return (
      <React.Fragment>
        {!this.props.sort && (
          <TouchableOpacity
            onPress={() => {
              const { itemKind, removeFilter } = this.props;
              removeFilter(itemKind);
              if (itemKind === 'brandId') {
                removeFilter('subBrandId');
              }
              if (itemKind === 'kindId') {
                removeFilter('eBrandId');
                removeFilter('brandId');
                removeFilter('subBrandId');
              }
              this.handleLabel(this.props.data.label);
              this.toggleModal();
            }}
            style={{
              flex: 1,
              padding: 3,
              margin: 7,
              backgroundColor: '#eee',
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 5
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'cairo-regular',
                textAlign:
                  this.props.isRTL && Platform.OS !== 'android'
                    ? 'right'
                    : 'left',
                paddingHorizontal: 10,
                color: '#ff5959'
              }}
            >
              {this.props.words.remove}
            </Text>
          </TouchableOpacity>
        )}
        {data.buckets.map((da: any) => {
          return (
            <FilterOption
              isRTL={this.props.isRTL}
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
    const { rest, itemKind, isRTL } = this.props;
    const selected =
      rest[itemKind] || rest[itemKind] === 0 || rest[itemKind] === false;

    return (
      <View>
        <TouchableOpacity
          style={[
            {
              flexDirection: !this.props.sort ? 'row-reverse' : 'row',
              paddingVertical: 5,
              height: 38,
              minWidth: 65,
              borderRadius: 18,
              marginHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center'
            },
            !this.props.sort
              ? {
                  borderWidth: 1,
                  borderColor: '#ddd',
                  paddingLeft: 10
                }
              : {}
          ]}
          onPress={this.props.disable ? () => null : () => this.toggleModal()}
        >
          <Text
            style={{
              color:
                selected || this.props.sort
                  ? '#7678ED'
                  : this.props.disable
                  ? '#aaa'
                  : '#555',
              fontSize: 15,
              fontWeight: selected ? 'bold' : '300',
              fontFamily: 'cairo-regular',
              paddingLeft: 5
            }}
          >
            {selected
              ? `${this.state.label}`
              : !this.props.rest[itemKind]
              ? this.props.sort
                ? data.buckets[0].name
                : data.label
              : this.state.label}
          </Text>
          {!this.props.sort && (
            <Ionicons
              style={{ paddingLeft: 10, top: 2 }}
              name="md-arrow-dropdown"
              size={24}
              color={selected ? '#7678ED' : '#555'}
            />
          )}
          {this.props.sort && (
            <Ionicons
              style={{ marginLeft: 5, paddingRight: 10 }}
              name="ios-funnel"
              size={30}
              color="#8E90F0"
            />
          )}
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
              backgroundColor: '#fff',
              borderRadius: 10,
              position: 'absolute',
              bottom: 0,
              margin: 0,
              height: 350,
              paddingTop: 10,
              width: width - 40,
              justifyContent: 'space-around',
              alignItems: 'center'
            }}
          >
            <ScrollView>{this.renderOptions(data)}</ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
