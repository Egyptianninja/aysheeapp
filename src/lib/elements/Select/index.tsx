import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
  Platform
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { Option } from './Option';
import { icons } from '../../../load';

const { width } = Dimensions.get('window');

export default class Select extends React.Component<any, any> {
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
      const iconFunc = da.icon
        ? icons.brands.filter(ic => ic.id === da.id)
        : null;
      const icon = iconFunc ? iconFunc[0].icon() : null;

      return (
        <Option
          key={da.id}
          isRTL={this.props.isRTL}
          icon={icon}
          toggleModal={this.toggleModal}
          onChange={this.props.onChange}
          itemData={da}
          {...this.props}
        />
      );
    });
  };

  renderlabel = (value: any, label: any, required: any, isRTL: any) => {
    if (required && value === '') {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: isRTL ? 'flex-end' : 'flex-start'
          }}
        >
          <Text style={{ fontSize: 14, paddingHorizontal: 10, color: '#777' }}>
            {label}
          </Text>
        </View>
      );
    } else if (value === '') {
      return (
        <Text style={{ fontSize: 14, paddingHorizontal: 10, color: '#777' }}>
          {label}
        </Text>
      );
    } else if (value !== '') {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: isRTL ? 'row-reverse' : 'row'
          }}
        >
          <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>
            {value.name && !value.en ? value.name : isRTL ? value.ar : value.en}
          </Text>
          {!this.props.nosubLabel && (
            <Text
              style={{
                fontSize: 16,
                paddingHorizontal: 10,
                color: '#ababab'
              }}
            >
              {label}
            </Text>
          )}
        </View>
      );
    }
  };

  render() {
    const { value, label, required, isRTL, values } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            width: this.props.width ? this.props.width : width - 60,
            height: 40,
            marginTop: 10,
            marginVertical: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 20,
            backgroundColor: '#fff'
          }}
          onPress={() => this.toggleModal()}
        >
          {this.renderlabel(value, label, required, isRTL)}
          <Ionicons
            style={{ top: 3 }}
            name="ios-arrow-down"
            size={24}
            color="#999"
          />
          <Text
            style={{
              fontSize: 16,
              color: '#FF5959',
              top: 0,
              right: -10
            }}
          >
            *{/* {this.props.words.require} */}
          </Text>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          onBackButtonPress={() => this.setState({ isModalVisible: false })}
          backdropOpacity={0.2}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          style={{ margin: 0 }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              position: 'absolute',
              bottom: 0,
              margin: 0,
              height:
                this.props.data < 8 ? this.props.data.length * 55 + 70 : 500,
              paddingTop: 20,
              width
            }}
          >
            <ScrollView>{this.renderOptions(this.props.data)}</ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
