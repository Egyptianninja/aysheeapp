import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { icons } from '../../../load';
import { rtlos } from '../../../utils';
import { Option } from './Option';

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
          <Text style={{ fontSize: 14, paddingHorizontal: 10, color: '#777' }}>
            {label}
          </Text>
          <Text
            style={{
              top: 5,
              fontSize: 12,
              paddingHorizontal: 10,
              color: 'rgba(255, 89, 89, 0.7)'
            }}
          >
            {this.props.words.require}
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
            flexDirection: isRTL && rtlos() !== 3 ? 'row-reverse' : 'row'
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
            flexDirection: isRTL && rtlos() !== 3 ? 'row-reverse' : 'row',
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
