import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  NotificationsScreen,
  ItemScreen,
  ProfileScreen,
  PhoneScreen,
  CodeScreen
} from '../../../screens';
import HeaderNoBack from '../../../componenets/Common/HeaderNoback';
import { Header } from '../../../componenets';

export const NotificationStack = createStackNavigator(
  {
    NotificationsScreen: {
      screen: NotificationsScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: <HeaderNoBack navigation={navigation} title="Notifications" />,
        headerBackTitle: null
      })
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
        backgroundColor: '#7678ED',
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
