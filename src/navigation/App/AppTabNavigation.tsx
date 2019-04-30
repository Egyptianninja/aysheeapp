import * as React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { ImageIcon } from '../../componenets';
import { images } from '../../load';
import { rtlos } from '../../utils';
import {
  HomeStack,
  NotificationStack,
  ProfileStack,
  SearchStack
} from './appTabStacks';
import CategoryButton from '../../componenets/HomeScreen/categoryButton';
import ImageIconNotify from '../../componenets/Common/ImageIconNotify';
let AppTabNavigation: any;
if (rtlos() === 3) {
  AppTabNavigation = createBottomTabNavigator(
    {
      Profile: {
        screen: ProfileStack,
        navigationOptions: ({ navigation }: any) => {
          const { routeName } = navigation.state.routes[navigation.state.index];
          const navigationOptions: any = {};
          if (
            routeName === 'ItemScreen' ||
            routeName === 'PhoneScreen' ||
            routeName === 'CodeScreen'
          ) {
            navigationOptions.tabBarVisible = false;
          } else {
            navigationOptions.tabBarIcon = ({ focused, tintColor }: any) => (
              <ImageIcon
                icon={images.personicon}
                iconout={images.personiconout}
                size={31}
                focused={focused}
                tintColor={tintColor}
              />
            );
          }
          return navigationOptions;
        }
      },
      Notification: {
        screen: NotificationStack,
        navigationOptions: ({ navigation }: any) => {
          const { routeName } = navigation.state.routes[navigation.state.index];
          const navigationOptions: any = {};
          if (
            routeName === 'ItemScreen' ||
            routeName === 'PhoneScreen' ||
            routeName === 'CodeScreen'
          ) {
            navigationOptions.tabBarVisible = false;
          } else {
            navigationOptions.tabBarIcon = ({ focused, tintColor }: any) => (
              <ImageIcon
                icon={images.notificationicon}
                iconout={images.notificationiconout}
                size={28}
                // right={30}
                focused={focused}
                tintColor={tintColor}
                notification={false}
              />
            );
          }
          return navigationOptions;
        }
      },
      // categories: {
      //   screen: SearchStack,
      //   navigationOptions: ({ navigation }: any) => ({
      //     tabBarButtonComponent: () => {
      //       return <CategoryButton />;
      //     }
      //   })
      // },
      Search: {
        screen: SearchStack,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }: any) => (
            <ImageIcon
              icon={images.searchicon}
              iconout={images.searchiconout}
              size={32}
              // left={30}
              focused={focused}
              tintColor={tintColor}
            />
          )
        }
      },
      Home: {
        screen: HomeStack,
        navigationOptions: ({ navigation }: any) => {
          const { routeName } = navigation.state.routes[navigation.state.index];
          const navigationOptions: any = {};

          if (
            routeName === 'OffersScreen' ||
            routeName.indexOf('Add') !== -1 ||
            routeName === 'ItemScreen' ||
            routeName === 'ChoiseScreen' ||
            routeName === 'PhoneScreen' ||
            routeName === 'CameraScreen' ||
            routeName === 'CodeScreen' ||
            routeName === 'ContactScreen'
          ) {
            navigationOptions.tabBarVisible = false;
          } else {
            navigationOptions.tabBarIcon = ({ focused, tintColor }: any) => (
              <ImageIcon
                icon={images.homeicon}
                iconout={images.homeiconout}
                size={30}
                focused={focused}
                tintColor={tintColor}
              />
            );
          }

          return navigationOptions;
        }
      }
    },

    {
      initialRouteName: 'Home',
      tabBarOptions: {
        activeTintColor: '#7678ED',
        inactiveTintColor: '#636363',
        showLabel: false,
        style: {
          // backgroundColor: '#f3f3f3'
        }
      }
    }
  );
} else {
  AppTabNavigation = createBottomTabNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions: ({ navigation }: any) => {
          const { routeName } = navigation.state.routes[navigation.state.index];
          const navigationOptions: any = {};
          if (
            routeName === 'OffersScreen' ||
            routeName.indexOf('Add') !== -1 ||
            routeName === 'ItemScreen' ||
            routeName === 'ChoiseScreen' ||
            routeName === 'PhoneScreen' ||
            routeName === 'CameraScreen' ||
            routeName === 'CodeScreen' ||
            routeName === 'ContactScreen'
          ) {
            navigationOptions.tabBarVisible = false;
          } else {
            navigationOptions.tabBarIcon = ({ focused, tintColor }: any) => (
              <ImageIcon
                icon={images.homeicon}
                iconout={images.homeiconout}
                size={30}
                focused={focused}
                tintColor={tintColor}
              />
            );
          }
          if (navigation.state.index === 0) {
            navigationOptions.tabBarOnPress = () => {
              if (navigation.state.index === 0) {
                const navigationInRoute = navigation.getChildNavigation(
                  navigation.state.routes[0].key
                );

                if (
                  !!navigationInRoute &&
                  navigationInRoute.isFocused() &&
                  !!navigationInRoute.state.params &&
                  !!navigationInRoute.state.params.handleHome
                ) {
                  navigationInRoute.state.params.handleHome();
                } else {
                  navigation.navigate(navigation.state.key);
                }
              }
            };
          }

          return navigationOptions;
        }
      },
      Search: {
        screen: SearchStack,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }: any) => (
            <ImageIcon
              icon={images.searchicon}
              iconout={images.searchiconout}
              size={32}
              // right={30}
              focused={focused}
              tintColor={tintColor}
            />
          )
        }
      },
      // categories: {
      //   screen: SearchStack,
      //   navigationOptions: ({ navigation }: any) => ({
      //     tabBarButtonComponent: () => {
      //       return <CategoryButton />;
      //     }
      //   })
      // },

      Notification: {
        screen: NotificationStack,
        navigationOptions: ({ navigation }: any) => {
          const { routeName } = navigation.state.routes[navigation.state.index];
          const navigationOptions: any = {};
          if (
            routeName === 'ItemScreen' ||
            routeName === 'PhoneScreen' ||
            routeName === 'CodeScreen'
          ) {
            navigationOptions.tabBarVisible = false;
          } else {
            navigationOptions.tabBarIcon = ({ focused, tintColor }: any) => (
              <ImageIconNotify
                icon={images.notificationicon}
                iconout={images.notificationiconout}
                size={28}
                // left={30}
                focused={focused}
                tintColor={tintColor}
              />
            );
          }
          return navigationOptions;
        }
      },
      Profile: {
        screen: ProfileStack,
        navigationOptions: ({ navigation }: any) => {
          const { routeName } = navigation.state.routes[navigation.state.index];
          const navigationOptions: any = {};
          if (
            routeName === 'ItemScreen' ||
            routeName === 'PhoneScreen' ||
            routeName === 'CodeScreen'
          ) {
            navigationOptions.tabBarVisible = false;
          } else {
            navigationOptions.tabBarIcon = ({ focused, tintColor }: any) => (
              <ImageIcon
                icon={images.personicon}
                iconout={images.personiconout}
                size={31}
                focused={focused}
                tintColor={tintColor}
              />
            );
          }
          return navigationOptions;
        }
      }
    },

    {
      initialRouteName: 'Home',
      tabBarOptions: {
        activeTintColor: '#7678ED',
        inactiveTintColor: '#636363',
        showLabel: false,
        style: {
          // backgroundColor: '#f3f3f3'
        }
      }
    }
  );
}

export default AppTabNavigation;
