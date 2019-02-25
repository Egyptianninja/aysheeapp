import * as React from 'react';
import { View, AsyncStorage, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import Modal from 'react-native-modal';
import { initApp } from '../../store/actions/globActions';
import refreshToken from '../../graphql/mutation/refreshToken';
import getMyCountry from '../../graphql/mutation/getMyCountry';
import { getLocaleCountry, getCodeFromCountry } from '../../utils';
import { images } from '../../load';
import { Choise } from '../../componenets/LoadScreen/Choise';
const { width, height } = Dimensions.get('window');

class LoadScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  timer: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isModalVisible: false,
      ipCountry: null,
      localeCountry: null,
      city: null,
      country: null
    };
    this.checkAuth();
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  refreshUserToken = async ({ country, city }: any) => {
    const response = await this.props.refreshToken({
      variables: { country, city }
    });
    const { token } = response.data.refreshToken;
    await AsyncStorage.setItem('aysheetoken', token);
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  chooseCountry = async (country: any) => {
    await this.refreshUserToken({ country, city: this.state.city });
    const code = getCodeFromCountry(country);
    await this.props.initApp(country, code);
    await this.hideModal();
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('App');
    }, 500);
  };

  checkAuth = async () => {
    const myCountry = await this.props.getMyCountry({});

    const ipCountry = myCountry ? myCountry.data.getMyCountry.country : '';
    const city = myCountry ? myCountry.data.getMyCountry.city : '';
    const localeCountry = getLocaleCountry();
    if (ipCountry === localeCountry) {
      await this.refreshUserToken({ country: ipCountry, city });
      const code = getCodeFromCountry(ipCountry);
      await this.props.initApp(ipCountry, code);
      this.props.navigation.navigate('App');
    } else {
      await this.setState({ ipCountry, localeCountry, city });
      this.showModal();
    }
  };

  renderOptions = () => {
    return (
      <View>
        <Choise name={this.state.ipCountry} action={this.chooseCountry} />
        <Choise name={this.state.localeCountry} action={this.chooseCountry} />
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#171717',
          width,
          height
        }}
      >
        <Image
          source={images.load}
          style={{ flex: 1, width: undefined, height: undefined }}
          resizeMode="cover"
          fadeDuration={0}
        />

        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => null}
          backdropOpacity={0.2}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          style={{ flex: 1 }}
        >
          <View
            style={{
              backgroundColor: '#eee',
              borderRadius: 10,
              position: 'absolute',
              bottom: 0,
              margin: 0,
              height: height - 40,
              paddingTop: 10,
              width: width - 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {this.renderOptions()}
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sms: state.user.sms
});

export default connect(
  mapStateToProps,
  {
    initApp
  }
)(
  graphql(refreshToken, {
    name: 'refreshToken'
  })(
    graphql(getMyCountry, {
      name: 'getMyCountry'
    })(LoadScreen)
  )
);
