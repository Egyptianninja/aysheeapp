import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addAvatar from '../../graphql/mutation/addAvatar';
import logoutFromAll from '../../graphql/mutation/logoutFromAll';
import refreshToken from '../../graphql/mutation/refreshToken';
import upgradeToStore from '../../graphql/mutation/upgradeToStore';
import getMyCountry from '../../graphql/mutation/getMyCountry';
import Modal from 'react-native-modal';
import { initApp } from '../../store/actions/globActions';

import { icons, images } from '../../load';
import {
  login,
  logout,
  phoneRemoved,
  emailRemoved,
  updateUser
} from '../../store/actions/userAtions';
import {
  getCountryCityFromToken,
  rtlos,
  StyleSheet,
  getCountryFromLatLon,
  getUserLocation,
  getCodeFromCountry,
  getLang
} from '../../utils';
import { AvatarCircle } from '../Avatar';
import { Choise } from '../LoadScreen/Choise';
import { Updates } from 'expo';
import LoadingTiny from '../Common/LoadingTiny';
const { width } = Dimensions.get('window');
class Drawer extends React.Component<any, any> {
  state = {
    isModalVisible: false,
    restartMessage: null,
    loading: false,
    avatar: null,
    originalCountry: null,
    ipCountry: null,
    locCountry: null,
    originalCity: null,
    ipCity: null,
    country: null
  };

  async componentDidMount() {
    const originalCountry = await AsyncStorage.getItem('originalCountry');
    const originalCity = await AsyncStorage.getItem('originalCity');
    const country = await AsyncStorage.getItem('country');

    this.setState({
      originalCountry,
      originalCity,
      country
    });
  }
  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  getListOfCountries = () => {
    const {
      ipCountry,
      locCountry,
      originalCountry,
      originalCity,
      ipCity
    } = this.state;
    if (ipCountry === locCountry && ipCountry === originalCountry) {
      return [
        {
          country: originalCountry,
          city: originalCity
        }
      ];
    } else if (ipCountry === locCountry && ipCountry !== originalCountry) {
      return [
        {
          country: originalCountry,
          city: originalCity
        },

        {
          country: ipCountry,
          city: ipCity
        }
      ];
    } else if (ipCountry !== locCountry && ipCountry === originalCountry) {
      return [
        {
          country: originalCountry,
          city: originalCity
        },

        {
          country: locCountry,
          city: ''
        }
      ];
    } else if (
      ipCountry !== locCountry &&
      ipCountry !== originalCountry &&
      locCountry !== originalCountry
    ) {
      return [
        {
          country: originalCountry,
          city: originalCity
        },
        {
          country: ipCountry,
          city: ipCity
        },
        {
          country: locCountry,
          city: ''
        }
      ];
    } else if (
      ipCountry !== locCountry &&
      ipCountry !== originalCountry &&
      locCountry === originalCountry
    ) {
      return [
        {
          country: originalCountry,
          city: originalCity
        },
        {
          country: ipCountry,
          city: ipCity
        }
      ];
    }
  };

  renderOptions = () => {
    const countries: any = this.getListOfCountries();
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
            {this.props.words.availablemarket}
          </Text>
        </View>
        <View>
          {countries.map((country: any) => {
            return (
              <Choise
                key={country.country}
                action={this.chooseCountry}
                country={country.country}
                city={country.city}
                width={width}
              />
            );
          })}
        </View>
      </React.Fragment>
    );
  };

  menuAction = async (id: number) => {
    switch (id) {
      case 0:
        return this.props.navigation.navigate('PhoneScreen', {
          origin: 'home'
        });

      case 1:
        if (this.props.isAuthenticated) {
          return this.props.navigation.navigate('UpgradeToStore', {
            title: this.props.words.apdateaccount
          });
        } else {
          return this.props.navigation.navigate('PhoneScreen', {
            directstore: true,
            origin: 'home'
          });
        }

      case 2:
        return this.props.navigation.navigate('MyProfileScreen', {
          user: this.props.user
        });
      case 3:
        if (this.props.isAuthenticated) {
          return this.props.navigation.navigate('ChoiseScreen', {
            title: this.props.words.addnewad
          });
        } else {
          return this.props.navigation.navigate('PhoneScreen', {
            add: true,
            origin: 'home'
          });
        }
      case 4:
        return this.props.navigation.navigate('AddOfferScreen');
      case 5:
        return this.props.navigation.navigate('MyProfileScreen', {
          user: this.props.user
        });
      case 6:
        return this.props.navigation.navigate('MyFavScreen', {
          title: this.props.words.favorites
        });

      case 8: {
        // TODO: uncomment to logout from all
        // await this.props.logoutFromAll();
        const { country, city } = await getCountryCityFromToken();
        AsyncStorage.removeItem('aysheetoken');
        this.props.logout();
        this.props.phoneRemoved();
        this.props.emailRemoved();
        const response = await this.props.refreshToken({
          variables: { country, city }
        });
        const { token } = response.data.refreshToken;
        await AsyncStorage.setItem('aysheetoken', token);
        this.props.navigation.goBack();
      }
    }
  };

  renderMenu = (menus: any, lng: any) => {
    const { isAuthenticated } = this.props;
    const isstore = isAuthenticated ? this.props.user.isstore : null;

    const items = isAuthenticated
      ? isstore
        ? [2, 3, 4, 5, 6, 7, 8]
        : [1, 2, 3, 5, 6, 7, 8]
      : [0, 1, 3, 7];
    const usermenu = menus.filter((mnu: any) => items.includes(mnu.id));

    return usermenu.map((menu: any) => {
      const iconFunc = icons.menu.filter(ic => ic.id === menu.id);
      const icon = iconFunc[0].icon;
      const size = iconFunc[0].size;
      const rtlOS = rtlos();
      return (
        <TouchableOpacity
          onPress={() => this.menuAction(menu.id)}
          key={menu.id}
          style={{ marginVertical: 2 }}
        >
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 7,
              flexDirection: rtlOS === 3 ? 'row-reverse' : 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <View
              style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Ionicons name={icon} size={size} color="#777" />
            </View>
            <Text
              style={{
                color: '#171717',
                fontSize: 16
                // fontFamily: lng === 'ar' ? 'cairo-light' : 'comfortaa-Regular'
              }}
            >
              {menu.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  renderHeader = (user: any) => {
    return (
      <View
        style={[
          styles.drawer,
          {
            borderBottomColor: '#ddd',
            flexDirection: rtlos() === 3 ? 'row-reverse' : 'row'
          }
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('MyProfileScreen', {
              user: this.props.user
            });
          }}
        >
          <AvatarCircle user={user} size={50} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('MyProfileScreen', {
              user: this.props.user
            });
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: '#555',
              padding: 10,
              fontFamily: 'cairo-light',
              fontWeight: 'bold'
            }}
          >
            {user.name ? user.name.substring(0, 18) : user.uniquename}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  nunLogedHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          margin: 30
        }}
      >
        <View
          style={{
            width: 100,
            height: 100
          }}
        >
          <Image
            style={{
              flex: 1,
              width: '100%',
              height: '100%'
              // tintColor: '#636363'
            }}
            source={images.namelogofull}
          />
        </View>
      </View>
    );
  };

  refreshUserToken = async ({ country, city, lang }: any) => {
    const response = await this.props.refreshToken({
      variables: { country, city, lang }
    });
    const { token } = response.data.refreshToken;
    await AsyncStorage.setItem('aysheetoken', token);
  };

  loadCountries = async () => {
    this.showModal();
    this.setState({ loading: true });
    const location = await getUserLocation();
    const res = await this.props.getMyCountry();

    const locCountry = getCountryFromLatLon(
      location.coords.latitude,
      location.coords.longitude
    );
    const ipCountry = res.data.getMyCountry.country;
    const city = res.data.getMyCountry.city;

    this.setState({
      ipCountry,
      locCountry,
      city
    });
    this.setState({ loading: false });
  };

  chooseCountry = async ({ country, city }: any) => {
    if (country === this.state.country) {
      this.hideModal();
      return;
    }
    const lang = await getLang();
    await this.refreshUserToken({ country, city, lang });
    const code = getCodeFromCountry(country);
    await this.props.initApp(country, code);
    await AsyncStorage.setItem('country', country);
    this.setState({
      loading: true,
      restartMessage: this.props.words.appwillrestart
    });
    setTimeout(() => {
      this.hideModal();
      Updates.reload();
    }, 3000);
  };

  render() {
    const lang = this.props.languageName;
    const menus = this.props.menu;
    const { user } = this.props;
    const marginTop = Platform.OS === 'android' ? 60 : 40;

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#f3f3f3'
        }}
      >
        <ScrollView style={{ flex: 1, marginTop }} scrollEventThrottle={60}>
          <TouchableOpacity
            onPress={async () => {
              this.loadCountries();
            }}
            style={{
              padding: 10,
              flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Ionicons
              style={{ paddingHorizontal: 10 }}
              name="ios-globe"
              size={30}
              color="#26A65B"
            />
            <Text style={{ color: '#26A65B' }}>
              {this.state.country} Market
            </Text>
          </TouchableOpacity>
          {this.props.isAuthenticated && (
            <View style={{ flex: 4 }}>
              {this.renderHeader(user)}
              <View style={{ height: 20 }} />
            </View>
          )}

          {this.renderMenu(menus, lang)}
          {this.props.isAuthenticated && this.props.user.isadmin && (
            <TouchableOpacity
              onPress={async () => {
                this.props.navigation.navigate('Control');
              }}
              style={{
                padding: 10,
                flexDirection: rtlos() === 3 ? 'row-reverse' : 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}
            >
              <Ionicons
                style={{ paddingHorizontal: 10 }}
                name="ios-cog"
                size={30}
              />
              <Text>Control</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <Modal
          isVisible={this.state.isModalVisible}
          onBackdropPress={() => this.hideModal()}
          onBackButtonPress={() => this.hideModal()}
          backdropOpacity={0.2}
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          style={{ flex: 1, margin: 0 }}
        >
          <View
            style={{
              backgroundColor: '#f7f7f7',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              position: 'absolute',
              bottom: 0,
              margin: 0,
              height: 300,
              width,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {this.state.loading && (
              <View style={{ padding: 10 }}>
                <Text>{this.state.restartMessage}</Text>
              </View>
            )}
            {this.state.loading && <LoadingTiny size={40} />}
            {!this.state.loading && (
              <View style={{ flex: 3 }}>{this.renderOptions()}</View>
            )}
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    marginHorizontal: 10
  },
  drawerImage: {
    height: 80,
    width: 80,
    borderRadius: 40
  },
  language: {
    marginHorizontal: 10,
    width: 100,
    height: 36,
    borderRadius: 18,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#555',
    shadowOpacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  moon: {
    paddingHorizontal: 10,
    marginLeft: 50
  }
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      login,
      logout,
      updateUser,
      phoneRemoved,
      emailRemoved,
      initApp
    },
    dispatch
  );

const mapStateToProps = (state: any) => ({
  languageName: state.glob.languageName,
  isAuthenticated: state.user.isAuthenticated,
  menu: state.glob.language.menu,
  user: state.user.user,
  words: state.glob.language.words
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  graphql(addAvatar, {
    name: 'addAvatar'
  })(
    graphql(logoutFromAll, {
      name: 'logoutFromAll'
    })(
      graphql(refreshToken, {
        name: 'refreshToken'
      })(
        graphql(upgradeToStore, {
          name: 'upgradeToStore'
        })(
          graphql(getMyCountry, {
            name: 'getMyCountry'
          })(Drawer)
        )
      )
    )
  )
);
