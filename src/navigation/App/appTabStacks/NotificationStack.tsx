import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Header } from '../../../componenets';
import HeaderNoBack from '../../../componenets/Common/HeaderNoback';
import {
  CodeScreen,
  ItemScreen,
  NotificationsScreen,
  PhoneScreen,
  ProfileScreen
} from '../../../screens';
import { words } from '../../../store/getStore';

export const NotificationStack = createStackNavigator(
  {
    NotificationsScreen: {
      screen: NotificationsScreen,
      navigationOptions: ({ navigation }: any) => {
        const word = words();
        return {
          header: (
            <HeaderNoBack navigation={navigation} title={word.notifications} />
          ),
          headerBackTitle: null
        };
      }
    },
    ItemScreen: {
      screen: ItemScreen,
      navigationOptions: ({ navigation }: any) => ({
        headerBackTitle: null
      })
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: (
          <Header
            navigation={navigation}
            title={navigation.getParam('user').name}
          />
        ),
        headerBackTitle: null
      })
    },
    PhoneScreen: {
      screen: PhoneScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: null
      })
    },
    CodeScreen: {
      screen: CodeScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: null
      })
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f3f3f3',
        height: 40
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
      // headerBackImage: <BackIcon />
    }
  }
);
