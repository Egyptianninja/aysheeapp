import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'expo-core';
import * as React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import { rtlos } from '../../../utils';
import FilterOption from './FilterOption';
import { icons } from '../../../load';

const { width } = Dimensions.get('window');

export default class FilterSelect extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      refreshing: false,
      isModalVisible: false,
      label: null
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  componentWillMount() {
    if (!this.state.lable && this.props.data) {
      this.setState({ label: this.props.data.label });
    }
  }
  handleLabel = (label: any) => {
    this.setState({ label });
  };
  renderOptions = (data: any, selected: any) => {
    return (
      <React.Fragment>
        {!this.props.sort && selected && (
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
              width,
              marginVertical: 5,
              paddingVertical: 5
            }}
          >
            <View
              style={{
                flexDirection:
                  rtlos() === 3
                    ? 'row'
                    : this.props.isRTL
                    ? 'row-reverse'
                    : 'row',
                paddingHorizontal: 20,
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 16,
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
            </View>
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
              icon={data.name === 'brandId'}
              {...this.props}
            />
          );
        })}
      </React.Fragment>
    );
  };

  render() {
    let data = this.props.data;
    if (!data || data.buckets.length === 0) {
      return null;
    }
    if (this.props.pid) {
      if (this.props.pid.id || this.props.pid.id === 0) {
        const { id, label, name } = this.props.pid;
        const buckets = data.buckets.filter((sb: any) => sb.pid === id);
        data = { buckets, label, name };
      }
    }
    const { rest, itemKind, isRTL, rtlOS } = this.props;
    const selected =
      rest[itemKind] || rest[itemKind] === 0 || rest[itemKind] === false;

    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={[
            {
              flexDirection:
                rtlOS < 1 ? 'row' : rtlOS === 3 ? 'row-reverse' : 'row',
              height: 38,
              width: this.props.sort ? undefined : 130,
              borderRadius: 5,
              marginHorizontal: 5,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10
            },
            !this.props.sort
              ? {
                  marginVertical: 10,
                  borderRadius: 19,
                  marginHorizontal: 5,
                  backgroundColor: '#fff',
                  borderColor: '#eee',
                  borderWidth: 1,
                  shadowOffset: { width: 2, height: 2 },
                  shadowColor: '#666',
                  shadowOpacity: 0.25
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
              fontSize: this.props.sort ? 12 : isRTL ? 14 : 16,
              fontWeight: selected ? 'bold' : '300'
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
          <Ionicons name="md-arrow-dropdown" size={30} color="#aaa" />

          {this.props.sort && (
            <Ionicons name="ios-funnel" size={26} color="#8E90F0" />
          )}
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          onBackButtonPress={() => this.setState({ isModalVisible: false })}
          backdropOpacity={0.5}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          style={{ margin: 0 }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 0,
              margin: 0,
              width,
              height:
                data.buckets.length < 7 ? data.buckets.length * 40 + 140 : 455,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                backgroundColor: '#8E90F0',
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff'
                }}
              >
                {this.props.data.label}
              </Text>
            </View>

            <FlatList
              onRefresh={() => null}
              refreshing={this.state.refreshing}
              data={data.buckets}
              renderItem={({ item }: any) => (
                <FilterOption
                  isRTL={this.props.isRTL}
                  key={item.id}
                  toggleModal={this.toggleModal}
                  handleLabel={this.handleLabel}
                  onChange={this.props.onChange}
                  width={width}
                  itemData={item}
                  bransIcon={data.name === 'brandId'}
                  {...this.props}
                />
              )}
              numColumns={1}
              keyExtractor={(item: any) => `${item.id}`}
              // removeClippedSubviews={true}
              disableVirtualization={true}
              onEndReachedThreshold={0.5}
              maxToRenderPerBatch={20}
            />

            {/* <ScrollView>{this.renderOptions(data, selected)}</ScrollView> */}
          </View>
        </Modal>
      </View>
    );
  }
}
