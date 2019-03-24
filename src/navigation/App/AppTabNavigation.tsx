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
      navigationOptions: {
        // tabBarLable: 'Home',
        tabBarIcon: ({ focused, tintColor }: any) => (
          <ImageIcon
            icon={images.homeicon}
            iconout={images.homeiconout}
            size={30}
            focused={focused}
            tintColor={tintColor}
          />
        )
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        // tabBarLable: 'Home',
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

    // CategoryStack: {
    //   screen: CategoryStack,
    //   navigationOptions: {
    //     // tabBarLable: 'Home',
    //     tabBarIcon: ({ focused, tintColor }: any) => (
    //       <ImageIcon
    //         icon={images.barcodeicon}
    //         iconout={images.barcoseiconout}
    //         size={28}
    //         focused={focused}
    //         tintColor={tintColor}
    //       />
    //     )
    //   }
    // },
    Notification: {
      screen: NotificationStack,
      navigationOptions: {
        // tabBarLable: 'Home',
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
        // tabBarLable: "My Shipments",
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
    // initialRouteName: "Notification"
  }
);

export default AppTabNavigation;
