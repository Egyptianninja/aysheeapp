import * as React from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { StyleSheet } from '../../utils';
import SearchBox from './SearchBox';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '../../load';
const home = icons.home.icon();
const mainmenu = icons.mainmenu.icon();
const namelogo = icons.namelogo.icon();

class HomeHeader extends React.Component<any, any> {
  state = {
    isSearch: false
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
            backgroundColor: '#fff',
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
              flex: 3,
              flexDirection: this.ardroid ? 'row-reverse' : 'row',
              justifyContent: 'flex-start'
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              const handleHome = this.props.navigation.getParam('handleHome');
              this.hideSearch();
              handleHome();
            }}
            style={{
              marginLeft: 7,
              marginTop: 1,
              padding: 1
            }}
          >
            <View
              style={{
                width: 28,
                height: 26
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  tintColor: '#777'
                }}
                source={home}
              />
            </View>
          </TouchableOpacity>
          {this.props.isAuthenticated && (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('NotificationsScreen');
              }}
              style={{
                paddingHorizontal: 5,
                marginLeft: 7,
                marginTop: 5
              }}
            >
              <Ionicons
                name="ios-notifications-outline"
                size={30}
                color="#777"
              />
            </TouchableOpacity>
          )}
        </View>

        <View
          style={[
            styles.searchView,
            {
              flex: 11,
              flexDirection: this.ardroid ? 'row-reverse' : 'row'
            }
          ]}
        >
          {this.state.isSearch && (
            <View style={{ flex: 1, paddingHorizontal: 10 }}>
              <SearchBox
                navigation={this.props.navigation}
                hideSearch={this.hideSearch}
              />
            </View>
          )}
          {!this.state.isSearch && (
            <React.Fragment>
              <View
                style={{
                  flex: 9.5,
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
                  flex: 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 4,
                  paddingHorizontal: 5
                }}
              >
                <Ionicons
                  style={{ color: '#777' }}
                  name="ios-search"
                  size={28}
                />
              </TouchableOpacity>
            </React.Fragment>
          )}
        </View>
        <View style={[styles.rightIconView, { flex: 1.5 }]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={{
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10
            }}
          >
            <View
              style={{
                width: 30,
                height: 20
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
    paddingHorizontal: 5,
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
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(HomeHeader);
