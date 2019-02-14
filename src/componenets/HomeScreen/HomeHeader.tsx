import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { StyleSheet } from '../../utils';
import SearchBox from './SearchBox';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '../../load';
const icon = icons.home.icon();
class HomeHeader extends React.Component<any, any> {
  render() {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: '#fff',
            shadowOffset: { width: 3, height: 3 },
            shadowColor: '#555',
            shadowOpacity: 0.1
          }
        ]}
      >
        <View
          style={[
            styles.leftIconView,
            {
              flexDirection: 'row',
              flex: this.props.isAuthenticated ? 2.8 : 1.3
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={{
              marginLeft: 5,
              marginTop: 4
            }}
          >
            <Ionicons name="ios-menu" size={37} color="#272727" />
          </TouchableOpacity>
          {this.props.isAuthenticated && (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('NotificationsScreen');
              }}
              style={{
                paddingHorizontal: 4,
                marginLeft: 7,
                marginTop: 3
              }}
            >
              <Ionicons
                name="ios-notifications-outline"
                size={33}
                color="#272727"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.searchView, { flex: 11 }]}>
          <SearchBox navigation={this.props.navigation} />
        </View>
        <View
          style={[
            styles.rightIconView,
            { flex: 1.5, paddingHorizontal: 3, marginHorizontal: 3 }
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              const handleHome = this.props.navigation.getParam('handleHome');
              handleHome();
            }}
            style={{
              paddingHorizontal: 5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 3
            }}
          >
            <View
              style={{
                width: 31,
                height: 31
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%'
                }}
                source={icon}
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
