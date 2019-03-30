import * as React from 'react';
import { images } from '../../load';
import { createBottomTabNavigator } from 'react-navigation';
import {
  HomeStack,
  NotificationStack,
  ProfileStack,
  SearchStack
} from './appTabStacks';
import { ImageIcon } from '../../componenets';

const AppTabNavigation = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: ({ navigation }: any) => {
        const { routeName } = navigation.state.routes[navigation.state.index];
        const navigationOptions: any = {};

        if (routeName === 'OffersScreen') {
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
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }: any) => (
          <ImageIcon
            icon={images.notificationicon}
            iconout={images.notificationiconout}
            size={28}
            focused={focused}
            tintColor={tintColor}
          />
        )
      }
    },
    Shipment: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }: any) => (
          <ImageIcon
            icon={images.personicon}
            iconout={images.personiconout}
            size={31}
            focused={focused}
            tintColor={tintColor}
          />
        )
      }
    }
  },

  {
    tabBarOptions: {
      activeTintColor: '#7678ED',
      showLabel: false
    }
  }
);

export default AppTabNavigation;
