import * as React from 'react';
import { graphql } from 'react-apollo';
import { AsyncStorage, Image, StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import getMyCountry from '../../graphql/mutation/getMyCountry';
import refreshToken from '../../graphql/mutation/refreshToken';
import { images } from '../../load';
import { initApp } from '../../store/actions/globActions';
import { getCodeFromCountry, getLang } from '../../utils';

class LoadScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  constructor(props: any) {
    super(props);
    this.getCountryToken();
    this.state = {};
  }

  refreshUserToken = async ({ country, city, lang }: any) => {
    const response = await this.props.refreshToken({
      variables: { country, city, lang }
    });
    const { token } = response.data.refreshToken;
    await AsyncStorage.setItem('aysheetoken', token);
    await AsyncStorage.setItem('country', country);
    await AsyncStorage.setItem('city', city);
  };

  getCountryToken = async () => {
    const storageCountry = await AsyncStorage.getItem('country');
    const originalCountry = await AsyncStorage.getItem('originalCountry');
    if (storageCountry && originalCountry) {
      this.props.navigation.navigate('HomeScreen');
    } else {
      const ipCountry = await this.props.getMyCountry({});
      const country = ipCountry ? ipCountry.data.getMyCountry.country : '';
      const city = ipCountry ? ipCountry.data.getMyCountry.city : '';
      const lang = await getLang();
      await this.refreshUserToken({ country, city, lang });
      const code = getCodeFromCountry(country);
      await this.props.initApp(country, code);
      await AsyncStorage.setItem('originalCountry', country);
      await AsyncStorage.setItem('originalCity', city);
      this.props.navigation.navigate('HomeScreen');
    }
  };

  render() {
    return (
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
      >
        <StatusBar translucent={true} barStyle={'dark-content'} />
        <Image
          source={images.load}
          style={{ flex: 1 }}
          resizeMode="contain"
          fadeDuration={0}
        />
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
