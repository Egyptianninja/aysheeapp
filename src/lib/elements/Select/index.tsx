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
            justifyContent: 'space-between',
            flexDirection:
              isRTL && Platform.OS !== 'android' ? 'row-reverse' : 'row'
          }}
        >
          <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>{label}</Text>
          <Text
            style={{
              fontSize: 16,
              paddingHorizontal: 10,
              color: '#FF5959'
            }}
          >
            {this.props.words.require}
          </Text>
        </View>
      );
    } else if (value === '') {
      return (
        <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>{label}</Text>
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
            width: this.props.width ? this.props.width : width - 40,
            height: 40,
            marginTop: 10,
            marginVertical: 10,
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            backgroundColor: '#eee'
          }}
          onPress={() => this.toggleModal()}
        >
          <Ionicons name="ios-arrow-down" size={26} color="#555" />

          {this.renderlabel(value, label, required, isRTL)}
        </TouchableOpacity>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.setState({ isModalVisible: false })}
          onBackButtonPress={() => this.setState({ isModalVisible: false })}
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
            <ScrollView>{this.renderOptions(this.props.data)}</ScrollView>
          </View>
        </Modal>
      </View>
    );
  }
}
