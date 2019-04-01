import { Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import * as React from 'react';
import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { icons, images } from '../../load';
import { StyleSheet, rtlos } from '../../utils';
import imageViewerStyle from '../../utils/image/viewer/image-viewer.style';
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
    notification: false
  };
  ardroid = Platform.OS === 'android' && this.props.lang === 'ar';

  render() {
    return (
      <View
        style={[
          styles.container,
          {
            flexDirection: this.ardroid ? 'row-reverse' : 'row',
            backgroundColor: '#f3f3f3',
            borderBottomWidth: 1,
            borderBottomColor: '#ddd'
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
              top: 5
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
            onPress={() => {
              // const handleHome = this.props.navigation.getParam('handleHome');
              // handleHome();
              const addItem = this.props.navigation.getParam('addItem');
              addItem();
            }}
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Ionicons name="ios-add" size={40} color="#636363" />
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
