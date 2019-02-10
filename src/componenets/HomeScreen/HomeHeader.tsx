import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import { StyleSheet } from '../../utils';
import SearchBox from './SearchBox';
import { Ionicons } from '@expo/vector-icons';

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
              flex: this.props.isAuthenticated ? 2.8 : 1.5
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={{
              paddingHorizontal: 2,
              marginLeft: 5,
              marginTop: 3
            }}
          >
            <Ionicons
              name="ios-menu"
              size={35}
              style={styles.icon}
              color="#5B4C57"
            />
          </TouchableOpacity>
          {this.props.isAuthenticated && (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('NotificationsScreen');
              }}
              style={{
                paddingHorizontal: 5,
                marginLeft: 5,
                marginTop: 3
              }}
            >
              <Ionicons name="ios-notifications" size={30} color="#5B4C57" />
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.searchView, { flex: 10 }]}>
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
              marginTop: 3
            }}
          >
            <Ionicons name="ios-home" size={33} color="#5B4C57" />
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
