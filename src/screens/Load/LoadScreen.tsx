import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { initApp } from '../../store/actions/globActions';
import refreshToken from '../../graphql/mutation/refreshToken';
import { getCountryCode, getCountryCodeQatar } from '../../utils';

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
    return <View style={{ flex: 1, backgroundColor: '#474747' }} />;
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
