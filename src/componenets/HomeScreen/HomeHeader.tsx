import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import * as React from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { icons } from '../../load';
import { StyleSheet, rtlos } from '../../utils';
import SearchBox from './SearchBox';
const home = icons.home.icon();
const mainmenu = icons.mainmenu.icon();
const namelogo = icons.namelogo.icon();

class HomeHeader extends React.Component<any, any> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (
      nextProps.navigation.getParam('notification') !== prevState.notification
    ) {
      return { notification: nextProps.navigation.getParam('notification') };
    } else {
      return { ...prevState };
    }
  }

  state = {
    isSearch: false,
    notification: false
  };
  ardroid = Platform.OS === 'android' && this.props.lang === 'ar';

  showSearch = () => {
    this.setState({ isSearch: true });
  };
  hideSearch = () => {
    this.setState({ isSearch: false });
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: this.ardroid ? 'row-reverse' : 'row',
            backgroundColor: '#7678ED',
            shadowOffset: { width: 3, height: 3 },
            shadowColor: '#777',
            shadowOpacity: 0.1
          }
        ]}
      >
        <View
          style={[
            styles.leftIconView,
            {
              flex: this.props.isAuthenticated ? 3.5 : 1.5,
              flexDirection: this.ardroid ? 'row-reverse' : 'row',
              justifyContent: 'flex-start'
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={{
              paddingLeft: 8,
              paddingRight: 5,
              paddingVertical: 8,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5
            }}
          >
            <View
              style={{
                width: 32,
                height: 22
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: undefined,
                  height: undefined
                }}
                source={mainmenu}
              />
            </View>
          </TouchableOpacity>

          {this.props.isAuthenticated && (
            <TouchableOpacity
              onPress={() => {
                const clearNotification = this.props.navigation.getParam(
                  'clearNotification'
                );
                clearNotification();
                this.props.navigation.navigate('NotificationsScreen');
              }}
              style={{
                paddingHorizontal: 10,
                paddingTop: 8,
                paddingRight: 12
              }}
            >
              <Ionicons
                name="ios-notifications-outline"
                size={30}
                color="#fff"
              />
              {this.state.notification && (
                <View
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    backgroundColor: '#ff00ff',
                    position: 'absolute',
                    right: 8,
                    top: 10
                  }}
                />
              )}
            </TouchableOpacity>
          )}
        </View>

        <View
          style={[
            styles.searchView,
            {
              flex: 10,
              flexDirection: this.ardroid ? 'row-reverse' : 'row'
            }
          ]}
        >
          {(this.props.query !== '' || this.state.isSearch) && (
            <View style={{ flex: 1, paddingRight: 10 }}>
              <SearchBox
                navigation={this.props.navigation}
                hideSearch={this.hideSearch}
              />
            </View>
          )}
          {!this.state.isSearch && this.props.query === '' && (
            <React.Fragment>
              <View
                style={{
                  flex: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    width: 85,
                    height: 20
                  }}
                >
                  <Image
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%'
                    }}
                    source={namelogo}
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => this.showSearch()}
                style={{
                  flex: 1.75,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: rtlos() === 3 ? 4 : undefined,
                  paddingVertical: 9,
                  paddingLeft: 5
                }}
              >
                <Ionicons
                  style={{ color: '#fff' }}
                  name="ios-search"
                  size={28}
                />
              </TouchableOpacity>
            </React.Fragment>
          )}
        </View>
        <View style={[styles.rightIconView, { flex: 1.75 }]}>
          <TouchableOpacity
            onPress={() => {
              const handleHome = this.props.navigation.getParam('handleHome');
              this.hideSearch();
              handleHome();
            }}
            style={{
              paddingHorizontal: 8,
              paddingRight: 10,
              paddingVertical: 7
            }}
          >
            <View
              style={{
                width: 26,
                height: 26
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  tintColor: '#fff'
                }}
                source={home}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    height: Constants.statusBarHeight + 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  leftIconView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightIconView: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = (state: any) => ({
  words: state.glob.language.words,
  lang: state.glob.languageName,
  isAuthenticated: state.user.isAuthenticated,
  query: state.post.query
});

export default connect(mapStateToProps)(HomeHeader);
