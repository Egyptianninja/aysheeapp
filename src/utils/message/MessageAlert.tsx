import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Loading, LoadingSmall } from '../../componenets';
import LoadingTiny from '../../componenets/Common/LoadingTiny';

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
      isMessageVisible: false,
      loading: true
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { hideMessageModal, onMessageModalHide } = this.props;
    if (this.state.isMessageVisible) {
      setTimeout(() => {
        this.setState({ loading: false });
        this.timer = setTimeout(() => {
          hideMessageModal();
          if (onMessageModalHide) {
            onMessageModalHide();
          }
          this.setState({ loading: true });
        }, 1000);
      }, 2500);
    }

    const { message, icon, isRTL, height, iconColor } = this.props;

    return (
      <Modal
        isVisible={this.state.isMessageVisible}
        backdropOpacity={0}
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        {this.state.loading && (
          <View
            style={{
              height,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f3f3f3'
            }}
          >
            <LoadingSmall />
          </View>
        )}
        {!this.state.loading && (
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
        )}
      </Modal>
    );
  }
}
