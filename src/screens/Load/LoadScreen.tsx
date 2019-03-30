import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
  Dimensions,
  Image,
  View,
  StatusBar,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import getMyCountry from '../../graphql/mutation/getMyCountry';
import refreshToken from '../../graphql/mutation/refreshToken';
import { images } from '../../load';
import { initApp } from '../../store/actions/globActions';
import { getCodeFromCountry, getLang } from '../../utils';
const { width, height } = Dimensions.get('window');

class LoadScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  animatedValue: any;
  timer: any;
  constructor(props: any) {
    super(props);
    this.getCountryToken();
    this.state = {};
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }
  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 2,
      duration: 1000
    }).start();
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  refreshUserToken = async ({ country, city, lang }: any) => {
    const response = await this.props.refreshToken({
      variables: { country, city, lang }
    });
    const { token } = response.data.refreshToken;
    await AsyncStorage.setItem('aysheetoken', token);
  };

  getCountryToken = async () => {
    const myCountry = await this.props.getMyCountry({});
    const ipCountry = myCountry ? myCountry.data.getMyCountry.country : '';
    const city = myCountry ? myCountry.data.getMyCountry.city : '';
    const lang = await getLang();
    await this.refreshUserToken({ country: ipCountry, city, lang });
    const code = getCodeFromCountry(ipCountry);
    await this.props.initApp(ipCountry, code);
    this.props.navigation.navigate('HomeScreen');
  };

  render() {
    const animatedStyle = {
      transform: [
        {
          scale: this.animatedValue
        }
      ]
    };
    return (
      <View
        style={[
          {
            flex: 1,
            backgroundColor: '#7678ED',
            width,
            height,
            justifyContent: 'center',
            alignItems: 'center'
          }
        ]}
      >
        <StatusBar translucent={true} barStyle={'light-content'} />
        <Animated.View style={[{ width: 75, height: 75 }, animatedStyle]}>
          <Image
            source={images.namelogowhite}
            style={{ flex: 1, width: undefined, height: undefined }}
            resizeMode="contain"
            fadeDuration={0}
          />
        </Animated.View>
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
