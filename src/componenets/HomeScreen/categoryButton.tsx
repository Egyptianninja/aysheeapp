import * as React from 'react';
import { TouchableOpacity, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { showModal } from '../../store/actions/globActions';
import { Platform } from 'expo-core';
import { isIphoneX } from '../../utils';
import { isAuthenticated, isRTL, words, user } from '../../store/getStore';
import { OfferAdChoise } from '../Menu';
class CategoryButton extends React.Component<any, any> {
  state = {
    isOfferAdChoiseModalVisible: false
  };

  render() {
    const auth = isAuthenticated();
    const usr = user();
    return (
      <React.Fragment>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: isIphoneX() ? 32 : 0,
            left: width / 2 - 24,
            zIndex: 100,
            borderRadius: 25,
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            if (auth) {
              if (usr.user.isstore) {
                this.setState({ isOfferAdChoiseModalVisible: true });
              } else {
                this.props.navigation.navigate('ChoiseScreen', {
                  title: words().addnewad
                });
              }
            } else {
              this.props.navigation.navigate('PhoneScreen', {
                add: true,
                origin: 'home'
              });
            }
            this.props.showModal();
          }}
        >
          <Ionicons
            style={{ top: Platform.OS === 'android' ? undefined : 2, left: 1 }}
            name="ios-add"
            size={40}
            color="#777"
          />
        </TouchableOpacity>
        <OfferAdChoise
          isOfferAdChoiseModalVisible={this.state.isOfferAdChoiseModalVisible}
          hideOfferAdChoiseModal={() =>
            this.setState({
              isOfferAdChoiseModalVisible: false
            })
          }
          navigation={this.props.navigation}
          word={words()}
          isRTL={isRTL()}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { showModal }
)(CategoryButton);
