import * as React from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { initApp } from '../../store/actions/globActions';
import refreshToken from '../../graphql/mutation/refreshToken';
import { parseJwt } from '../../utils';
import { telecode } from '../../constants';

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

  getCountryCodeProd = async () => {
    const token = await AsyncStorage.getItem('aysheetoken');
    const data = parseJwt(token);
    const teleitem = telecode.filter((cc: any) => cc.name === data.country);
    return {
      country: data.country,
      ccode: teleitem[0].tel
    };
  };
  getCountryCode = async () => {
    const token = await AsyncStorage.getItem('aysheetoken');
    const data = parseJwt(token);
    const teleitem =
      data.country === ''
        ? telecode.filter((cc: any) => cc.name === 'Qatar')
        : telecode.filter((cc: any) => cc.name === data.country);
    if (teleitem.length > 0) {
      return {
        country: data.country === '' ? 'Qatar' : data.country,
        ccode: teleitem[0].tel
      };
    } else {
      return { country: '', ccode: '' };
    }
  };

  checkAuth = async () => {
    await this.refreshUserToken();
    const { country, ccode } = await this.getCountryCode();
    await this.props.initApp(country, ccode);
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
