import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { graphql } from 'react-apollo';
import {
  AsyncStorage,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import addAvatar from '../../graphql/mutation/addAvatar';
import logoutFromAll from '../../graphql/mutation/logoutFromAll';
import refreshToken from '../../graphql/mutation/refreshToken';
import upgradeToStore from '../../graphql/mutation/upgradeToStore';
import { icons, images } from '../../load';
import {
  login,
  logout,
  phoneRemoved,
  updateUser
} from '../../store/actions/userAtions';
import { getCountryCityFromToken, StyleSheet } from '../../utils';
import { AvatarCircle } from '../Avatar';

class Drawer extends React.Component<any, any> {
  state = {
    avatar: null
  };

  menuAction = async (id: number) => {
    switch (id) {
      case 0:
        return this.props.navigation.navigate('Auth');

      case 1:
        if (this.props.isAuthenticated) {
          return this.props.navigation.navigate('UpgradeToStore', {
            title: this.props.words.apdateaccount
          });
        } else {
          return this.props.navigation.navigate('PhoneScreen', {
            directstore: true
          });
        }

      case 2:
        return this.props.navigation.navigate('ProfileScreen', {
          user: this.props.user
        });
      case 3:
        if (this.props.isAuthenticated) {
          return this.props.navigation.navigate('ChoiseScreen', {
            title: this.props.words.addnewad
          });
        } else {
          return this.props.navigation.navigate('PhoneScreen', {
            add: true
          });
        }
      case 4:
        return this.props.navigation.navigate('AddOfferScreen');
      case 5:
        return this.props.navigation.navigate('ProfileScreen', {
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
      return (
        <TouchableOpacity
          onPress={() => this.menuAction(menu.id)}
          key={menu.id}
          style={{ marginVertical: 2 }}
        >
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              marginVertical: 7,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <View
              style={{
                width: 50,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Ionicons
                name={icon}
                size={33}
                color="#777"
                style={{ marginHorizontal: 5 }}
              />
            </View>
            <Text
              style={{
                color: '#171717',
                fontSize: 16,
                fontFamily: lng === 'ar' ? 'cairo-light' : 'comfortaa-Regular'
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
      <View style={[styles.drawer, { borderBottomColor: '#555' }]}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ProfileScreen', {
              user: this.props.user
            });
          }}
        >
          <AvatarCircle user={user} size={88} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('ProfileScreen', {
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
              fontSize: 16,
              color: '#555',
              paddingVertical: 10,
              fontFamily: 'cairo-light'
            }}
          >
            {user.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#555',
              paddingVertical: 10
            }}
          >
            + {user.phone}
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
            width: 150,
            height: 150
            // shadowOffset: { width: 3, height: 3 },
            // shadowColor: '#000',
            // shadowOpacity: 0.5
          }}
        >
          <Image
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              tintColor: '#7678ED'
            }}
            source={images.namelogowhite}
          />
        </View>
      </View>
    );
  };

  render() {
    const lang = this.props.languageName;
    const menus = this.props.menu;
    const { user } = this.props;

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff'
        }}
      >
        <ScrollView style={{ flex: 2 }} scrollEventThrottle={60}>
          {!this.props.isAuthenticated && this.nunLogedHeader()}
          {this.props.isAuthenticated && (
            <View style={{ flex: 4, marginTop: 20 }}>
              {this.renderHeader(user)}
              <View style={{ height: 20 }} />
            </View>
          )}
          {this.renderMenu(menus, lang)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    marginHorizontal: 30
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
      phoneRemoved
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
        })(Drawer)
      )
    )
  )
);
