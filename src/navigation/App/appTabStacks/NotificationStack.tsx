import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { NotificationsScreen } from '../../../screens';
import { Header } from '../../../componenets';

export const NotificationStack = createStackNavigator(
  {
    NotificationsScreen: {
      screen: NotificationsScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: <Header navigation={navigation} title="Notifications" />,
        headerBackTitle: null
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
