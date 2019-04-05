import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
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
    const { labelStyle, label, rtl, value, period } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems:
            rtl && Platform.OS !== 'android' ? 'flex-end' : 'flex-start'
        }}
      >
        <Text style={labelStyle}>{label}</Text>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            marginVertical: 10,
            height: 100,
            width: '100%',
            borderRadius: 20,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => this.toggleModal()}
        >
          {value !== '' && period && (
            <React.Fragment>
              <Text
                style={{
                  fontSize: 16,
                  paddingHorizontal: 20,
                  color: '#7678ED'
                }}
              >
                {Object.keys(this.props.value.name[0])[0]}
              </Text>
              <Text style={{ fontSize: 16, color: '#7678ED' }}>
                {
                  Object.keys(
                    this.props.value.name[this.props.value.name.length - 1]
                  )[0]
                }
              </Text>
            </React.Fragment>
          )}
          {this.props.value !== '' && !this.props.period && (
            <Text style={{ fontSize: 16, color: '#7678ED' }}>
              {this.props.value.name}
            </Text>
          )}
          {!this.props.value.name && (
            <Ionicons name={this.props.iconName} size={55} color="#8E90F0" />
          )}
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
