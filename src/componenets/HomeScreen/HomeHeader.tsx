import { AntDesign } from '@expo/vector-icons';
import { Constants } from 'expo';
import * as React from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { icons } from '../../load';
import { rtlos, StyleSheet } from '../../utils';
import FollowModal from './FollowModal';
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
    notification: false,
    isFollowModalVisible: false
  };
  ardroid = Platform.OS === 'android' && this.props.lang === 'ar';

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: this.ardroid ? 'row-reverse' : 'row',
            backgroundColor: '#f3f3f3'
            // borderBottomWidth: 1,
            // borderBottomColor: '#ddd'
          }
        ]}
      >
        <View
          style={[
            styles.leftIconView,
            {
              flex: 1.5,
              flexDirection: this.ardroid ? 'row-reverse' : 'row',
              justifyContent: 'flex-start'
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.toggleDrawer()}
            style={{
              flex: 1,
              paddingVertical: 8,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                width: 30,
                height: 21
              }}
            >
              <Image
                style={{
                  flex: 1,
                  width: undefined,
                  height: undefined,
                  tintColor: '#636363'
                }}
                source={mainmenu}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 9,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: 90,
              height: 24,
              top: 2
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
        <View style={{ flex: 1.5 }}>
          <TouchableOpacity
            onPress={() => this.setState({ isFollowModalVisible: true })}
            style={{
              flex: 1,
              top: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <AntDesign name="appstore1" size={27} color="#636363" />
          </TouchableOpacity>
        </View>
        <FollowModal
          isFollowModalVisible={this.state.isFollowModalVisible}
          hideFollowModal={() => this.setState({ isFollowModalVisible: false })}
          word={this.props.words}
          isRTL={this.props.isRTL}
          user={this.props.user}
          removeFilter={this.props.removeFilter}
          addFilter={this.props.addFilter}
          categories={this.props.categories}
          addCategoryId={this.props.addCategoryId}
          categoryIds={this.props.categoryIds}
          addOfferFilter={this.props.addOfferFilter}
          navigation={this.props.navigation}
        />
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
