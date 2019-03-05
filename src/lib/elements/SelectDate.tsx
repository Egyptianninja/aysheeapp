import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

import CalendarsPeriod from '../../utils/calendar/period';
import CalendarsSingle from '../../utils/calendar/single';

export default class SelectDate extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isModalVisible: false
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View
        style={{
          flex: 1
          // marginHorizontal: 45
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 10,
            justifyContent: 'space-between',
            paddingHorizontal: 10,

            paddingBottom: 10
          }}
          onPress={() => this.toggleModal()}
        >
          {this.props.value === '' && (
            <Text style={{ fontSize: 16, paddingRight: 20 }}>
              {this.props.lable}
            </Text>
          )}

          {this.props.value !== '' && this.props.period && (
            <React.Fragment>
              <Text style={{ fontSize: 16, paddingRight: 20 }}>
                {Object.keys(this.props.value.name[0])[0]}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {
                  Object.keys(
                    this.props.value.name[this.props.value.name.length - 1]
                  )[0]
                }
              </Text>
            </React.Fragment>
          )}
          {this.props.value !== '' && !this.props.period && (
            <Text style={{ fontSize: 16 }}>{this.props.value.name}</Text>
          )}
          {!this.props.value.name && (
            <Ionicons name={this.props.iconName} size={26} color="#ddd" />
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
          {this.props.period && (
            <CalendarsPeriod
              onChange={this.props.onChange}
              toggleModal={this.toggleModal}
              name={this.props.name}
              {...this.props}
            />
          )}
          {!this.props.period && (
            <CalendarsSingle
              onChange={this.props.onChange}
              toggleModal={this.toggleModal}
              name={this.props.name}
              {...this.props}
            />
          )}
        </Modal>
      </View>
    );
  }
}
