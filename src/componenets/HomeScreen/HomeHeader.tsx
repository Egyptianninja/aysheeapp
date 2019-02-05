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
        <View style={[styles.leftIconView, { flexDirection: 'row' }]}>
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={{
              paddingHorizontal: 2,
              marginLeft: 10,
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
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('NotificationsScreen');
            }}
            style={{
              paddingHorizontal: 5,
              marginLeft: 2,
              marginTop: 3
            }}
          >
            <Ionicons name="ios-notifications" size={30} color="#5B4C57" />
          </TouchableOpacity>
        </View>

        <View style={[styles.searchView, { flex: 10 }]}>
          <SearchBox navigation={this.props.navigation} />
        </View>
        <View
          style={[styles.rightIconView, { flex: 2.7, paddingHorizontal: 3 }]}
        >
          <TouchableOpacity
            style={{
              height: 32,
              width: '90%',
              backgroundColor: '#eee',

              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              flexDirection: 'row'
            }}
            onPress={() =>
              this.props.isAuthenticated
                ? this.props.navigation.navigate('ChoiseScreen')
                : this.props.navigation.navigate('Auth')
            }
          >
            <Text
              style={{
                paddingHorizontal: 4,
                fontSize: 14,
                color: '#5B4C57',
                fontWeight: 'bold',
                fontFamily: 'cairo-regular'
              }}
            >
              {this.props.words.listfree} ╋
            </Text>
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
