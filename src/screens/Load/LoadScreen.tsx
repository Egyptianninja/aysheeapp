import * as React from 'react';
import { graphql } from 'react-apollo';
import { AsyncStorage, Dimensions, Image, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { Choise } from '../../componenets/LoadScreen/Choise';
import getMyCountry from '../../graphql/mutation/getMyCountry';
import refreshToken from '../../graphql/mutation/refreshToken';
import { images } from '../../load';
import { initApp } from '../../store/actions/globActions';
import { getCodeFromCountry } from '../../utils';
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
    this.getCountryToken();
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

  chooseCountry = async ({ country, city }: any) => {
    await this.refreshUserToken({ country, city });
    const code = getCodeFromCountry(country);
    await this.props.initApp(country, code);
    await this.hideModal();
    this.timer = setTimeout(() => {
      this.props.navigation.navigate('App');
    }, 500);
  };

  getCountryToken = async () => {
    const myCountry = await this.props.getMyCountry({});
    const ipCountry = myCountry ? myCountry.data.getMyCountry.country : '';
    const city = myCountry ? myCountry.data.getMyCountry.city : '';

    // TODO: lonlatCountry
    // const location = this.props.permissions.LOCATION
    //   ? await Location.getCurrentPositionAsync({})
    //   : null;
    // const lonlatCountry = location
    //   ? await getCountryFromLatLon(
    //       location.coords.latitude,
    //       location.coords.longitude
    //     )
    //   : null;

    // TODO: ready as local or ip country
    // const localeCountry = getLocaleCountry();
    // if (ipCountry === localeCountry) {
    //   await this.refreshUserToken({ country: ipCountry, city });
    //   const code = getCodeFromCountry(ipCountry);
    //   await this.props.initApp(ipCountry, code);
    //   this.props.navigation.navigate('App');
    // } else {
    //   await this.setState({ ipCountry, localeCountry, city });
    //   this.showModal();
    // }

    // TODO: only ip data used
    await this.refreshUserToken({ country: ipCountry, city });
    const code = getCodeFromCountry(ipCountry);
    await this.props.initApp(ipCountry, code);
    this.props.navigation.navigate('App');
  };

  renderOptions = () => {
    return (
      <React.Fragment>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#aaa',
              padding: 10,
              alignSelf: 'center'
            }}
          >
            Choose Market‎
          </Text>
        </View>
        <View>
          <Choise
            action={this.chooseCountry}
            country={this.state.ipCountry}
            city={this.state.city}
            width={width}
          />
          <Choise
            action={this.chooseCountry}
            country={this.state.localeCountry}
            city=""
            width={width}
          />
        </View>
      </React.Fragment>
    );
  };
  renderLogo = () => {
    return (
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            width: 150,
            height: 40,
            overflow: 'hidden',
            marginHorizontal: 10
          }}
        >
          <Image
            style={{
              flex: 1,
              width: '100%',
              height: '100%'
            }}
            source={require('../../../assets/icons/header/namelogo.png')}
          />
        </View>
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
          resizeMode="contain"
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
              backgroundColor: '#f7f7f7',
              borderRadius: 10,
              position: 'absolute',
              bottom: 0,
              margin: 0,
              height: height - 80,
              width: width - 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {this.renderLogo()}

            <View style={{ flex: 3 }}>{this.renderOptions()}</View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  sms: state.user.sms,
  permissions: state.glob.permissions
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
