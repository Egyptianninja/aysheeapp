import * as React from 'react';
import { View, AsyncStorage, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { initApp } from '../../store/actions/globActions';
import refreshToken from '../../graphql/mutation/refreshToken';
import { getCountryCode, getCountryCodeQatar } from '../../utils';
import { images } from '../../load';
const { width, height } = Dimensions.get('window');
class LoadScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };

  constructor(props: any) {
    super(props);
    this.checkAuth();
  }

  refreshUserToken = async () => {
    const response = await this.props.refreshToken();
    const { token } = response.data.refreshToken;
    await AsyncStorage.setItem('aysheetoken', token);
  };

  checkAuth = async () => {
    await this.refreshUserToken();
    const { country, code } = __DEV__
      ? await getCountryCodeQatar()
      : await getCountryCode();
    await this.props.initApp(country, code);
    this.props.navigation.navigate('App');
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
          style={{ flex: 1, width: '100%', height: '100%' }}
          resizeMode="cover"
        />
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
  })(LoadScreen)
);
