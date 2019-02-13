import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import { FilterOption } from './FilterOption';
import { FilterIcon } from './FilterIcon';
import { icons } from '../../../load';

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
              textAlign: this.props.lang === 'ar' ? 'right' : 'left',
              paddingHorizontal: 10,
              color: '#ff5959'
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
    const { rest, itemKind, lang } = this.props;
    const selected =
      rest[itemKind] || rest[itemKind] === 0 || rest[itemKind] === false;
    const selectedLable =
      selected && rest[itemKind] !== false && rest[itemKind] !== true;
    const iconFunc = icons.filterIcons.filter(ic => ic.id === itemKind);
    const icon = iconFunc[0].icon();
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            padding: 2,
            paddingLeft: 2,
            height: 42,
            minWidth: 70,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 7,
            // marginTop: 15,
            borderWidth: 1,
            borderColor: selected ? '#7678ED' : '#E7E4E6',
            // backgroundColor: selected ? '#9C949A' : '#fff',
            backgroundColor: '#fff',
            shadowOffset: { width: 0, height: 0 },
            shadowColor: '#555',
            shadowOpacity: 0.3,
            paddingHorizontal: 10
          }}
          onPress={this.props.disable ? () => null : () => this.toggleModal()}
        >
          <Text
            style={{
              color: selected
                ? '#7678ED'
                : this.props.disable
                ? '#ccc'
                : '#272727',
              fontSize: 14,
              fontFamily: 'cairo-regular',
              fontWeight: selected ? 'bold' : '300',
              paddingHorizontal: 10
            }}
          >
            {selected
              ? `${this.state.label}`
              : !this.props.rest[itemKind]
              ? data.label
              : this.state.label}
          </Text>
          {/* {selectedLable && (
            <View
              style={{
                position: 'absolute',
                left: lang === 'ar' ? undefined : 30,
                right: lang === 'ar' ? 30 : undefined,
                top: -5
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'cairo-regular'
                  // color: '#fff'
                }}
              >
                {data.label}
              </Text>
            </View>
          )} */}
          <FilterIcon icon={icon} size={20} />
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
