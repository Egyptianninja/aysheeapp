import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import { AvatarCircle } from '../Avatar';

const { width } = Dimensions.get('window');

class NotificationModal extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (
      nextProps.isNotificationModalVisible !==
      prevState.isNotificationModalVisible
    ) {
      return {
        isNotificationModalVisible: nextProps.isNotificationModalVisible
      };
    } else {
      return { ...prevState };
    }
  }
  constructor(props: any) {
    super(props);
    this.state = {
      isNotificationModalVisible: false
    };
  }

  render() {
    const { navigation, isRTL, lang, notification, word } = this.props;
    const { user, title, body, postId } = notification.data;
    return (
      <Modal
        isVisible={this.state.isNotificationModalVisible}
        onBackdropPress={() => this.props.hideNotificationModal()}
        onBackButtonPress={() => this.props.hideNotificationModal()}
        backdropOpacity={0.2}
        // useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onSwipeComplete={() => this.props.hideNotificationModal()}
        swipeDirection="down"
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View
          style={{
            height: 200,
            justifyContent: 'center',
            alignItems: isRTL ? 'flex-end' : 'flex-start',
            padding: 20,
            backgroundColor: '#fff'
          }}
        >
          {user && <AvatarCircle user={user} size={40} />}

          <TouchableWithoutFeedback
            onPress={() => {
              this.props.hideNotificationModal();
              navigation.navigate('ItemScreen', {
                postId,
                word,
                lang,
                isRTL
              });
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: isRTL ? 'flex-end' : 'flex-start'
              }}
            >
              <Text
                style={{
                  padding: 5,
                  fontWeight: 'bold'
                }}
              >
                {title}
              </Text>
              <View style={{ padding: 10 }}>
                <Text>{body}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }
}

export default NotificationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 20,
    width: '100%'
  },
  outerStyle: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 5
  },
  innerStyle: {
    width: width - 40,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    writingDirection: 'auto',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5
  },
  labelStyle: {
    fontSize: 18,
    padding: 5
  },
  btnStyle: {
    marginTop: 30,
    height: 60,
    width: width - 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 5
  },
  btnTextStyle: {
    color: '#fff',
    fontSize: 20
  }
});
