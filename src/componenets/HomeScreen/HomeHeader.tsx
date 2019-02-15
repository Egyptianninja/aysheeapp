import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { StyleSheet } from '../../utils';
import SearchBox from './SearchBox';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '../../load';
const home = icons.home.icon();
const mainmenu = icons.mainmenu.icon();
const namelogo = icons.namelogo.icon();
const search = icons.search.icon();

class HomeHeader extends React.Component<any, any> {
  render() {
    return (
      <View
        style={[
          styles.container,
          {
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
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={{
              marginLeft: 7,
              marginTop: 1,
              padding: 1
            }}
          >
            <View
              style={{
                width: 34,
                height: 23
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
                size={33}
                color="#777"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.searchView, { flex: 11, flexDirection: 'row' }]}>
          {/* <View style={{ flex: 1 }}>
            <SearchBox navigation={this.props.navigation} />
          </View> */}
          <View
            style={{
              flex: 9.5,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                width: 90,
                height: 22
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
          <View
            style={{
              flex: 1.5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 4,
              paddingRight: 3
            }}
          >
            <Ionicons style={{ color: '#777' }} name="ios-search" size={31} />
          </View>
        </View>
        <View style={[styles.rightIconView, { flex: 1.5 }]}>
          <TouchableOpacity
            onPress={() => {
              const handleHome = this.props.navigation.getParam('handleHome');
              handleHome();
            }}
            style={{
              paddingRight: 5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 3
            }}
          >
            <View
              style={{
                width: 30,
                height: 30
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    height: Constants.statusBarHeight + 45,
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
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(HomeHeader);
