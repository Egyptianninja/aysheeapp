import * as React from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'react-apollo';
import {
  login,
  logout,
  updateUser,
  phoneRemoved
} from '../../store/actions/userAtions';
import addAvatar from '../../graphql/mutation/addAvatar';
import refreshToken from '../../graphql/mutation/refreshToken';
import logoutFromAll from '../../graphql/mutation/logoutFromAll';
import { StyleSheet, pickImage, getCountryCityFromToken } from '../../utils';
import secrets from '../../constants/secrets';
import { icons } from '../../load';
import { Avatar } from '../Avatar';

class Drawer extends React.Component<any, any> {
  state = {
    avatar: null
  };

  menuAction = async (id: number) => {
    switch (id) {
      case 0:
        return this.props.navigation.navigate('Profile');
      case 1:
        return this.props.navigation.navigate('ChoiseScreen');
      case 2:
        return this.props.navigation.navigate('MyPostsScreen');
      case 3:
        return this.props.navigation.navigate('MyFavScreen');
      case 6: {
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
    return menus.map((menu: any) => {
      const iconFunc = icons.menu.filter(ic => ic.id === menu.id);
      const icon = iconFunc[0].icon;
      return (
        <TouchableOpacity
          onPress={() => this.menuAction(menu.id)}
          key={menu.id}
        >
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
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
                color="#5B4C57"
                style={{ marginHorizontal: 5 }}
              />
            </View>

            <Text
              style={{
                color: '#5B4C57',
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
    const uri = user.avatar
      ? `http://res.cloudinary.com/${
          secrets.upload.CLOUD_NAME
        }/image/upload/w_${100}/${user.avatar}`
      : 'https://res.cloudinary.com/arflon/image/upload/v1541759172/logo_q1vzrp.png';
    return (
      <View style={[styles.drawer, { borderBottomColor: '#5B4C57' }]}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Profile');
          }}
          onLongPress={async () => {
            const avatar = await pickImage(true, 400, 0.8);
            if (avatar) {
              const res = await this.props.addAvatar({
                variables: {
                  avatar
                }
              });
              if (res.data.addAvatar.ok) {
                this.props.updateUser({ avatar });
              }
              if (!res.data.addAvatar.ok) {
                console.log('Error', res.data.addAvatar.error);
              }
            }
          }}
        >
          {!user.avatar && (
            <Avatar name={user.name ? user.name : user.uniquename} size={80} />
          )}
          {user.avatar && (
            <Image
              style={{
                height: 80,
                width: 80,
                borderRadius: 40
              }}
              source={{ uri }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Profile');
          }}
        >
          {!user.name && (
            <Text
              style={{
                fontSize: 16,
                color: '#5B4C57',
                paddingVertical: 10
              }}
            >
              + {user.phone}
            </Text>
          )}
          {user.name !== '' && (
            <Text
              style={{
                fontSize: 16,
                color: '#5B4C57',
                paddingVertical: 10
              }}
            >
              {user.name}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  nunLogedHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 50,
          height: 150,
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Auth');
            // this.props.navigation.navigate("FastLoginScreen");
          }}
          style={{
            paddingHorizontal: 30,
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: '#5B4C57',
              fontFamily: 'cairo-bold',
              paddingVertical: 10
            }}
          >
            {this.props.words.login}
          </Text>
        </TouchableOpacity>
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
        // forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <ScrollView style={{ flex: 1 }} scrollEventThrottle={60}>
          {!this.props.isAuthenticated && this.nunLogedHeader()}
          {this.props.isAuthenticated && (
            <View style={{ flex: 3, marginTop: 20 }}>
              {this.renderHeader(user)}
              <View style={{ height: 20 }} />
              {this.renderMenu(menus, lang)}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
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
      })(Drawer)
    )
  )
);
