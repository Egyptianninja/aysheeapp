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
                focused={focused}
                tintColor={tintColor}
                notification={false}
              />
            );
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
            routeName === 'CodeScreen'
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
            routeName === 'CodeScreen'
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
      },
      Search: {
        screen: SearchStack,
        navigationOptions: {
          tabBarIcon: ({ focused, tintColor }: any) => (
            <ImageIcon
              icon={images.searchicon}
              iconout={images.searchiconout}
              size={32}
              focused={focused}
              tintColor={tintColor}
            />
          )
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
                focused={focused}
                tintColor={tintColor}
                notification={false}
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
