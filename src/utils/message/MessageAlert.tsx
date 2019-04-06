import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';

export default class MessageAlert extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.isMessageVisible !== prevState.isMessageVisible) {
      return { isMessageVisible: nextProps.isMessageVisible };
    } else {
      return { ...prevState };
    }
  }
  timer: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isMessageVisible: false
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => this.props.hideMessageModal(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { message, icon, isRTL, height, iconColor } = this.props;

    return (
      <Modal
        isVisible={this.state.isMessageVisible}
        backdropOpacity={0}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View
          style={{
            height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eee'
          }}
        >
          <View
            style={{
              position: 'absolute',
              right: isRTL ? undefined : 20,
              left: isRTL ? 20 : undefined,
              top: 30,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Ionicons
              name={icon}
              size={36}
              color={iconColor ? iconColor : '#7678ED'}
            />
          </View>
          <View
            style={{
              alignSelf: isRTL ? 'flex-end' : 'flex-start',
              paddingHorizontal: 10,
              paddingLeft: 25,
              alignItems: 'flex-start',
              marginBottom: 10
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '400' }}>{message}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}
