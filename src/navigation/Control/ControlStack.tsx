import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Header } from '../../componenets';
import { ControlScreen } from '../../screens/Control';
import { ItemScreen, ProfileScreen } from '../../screens';
export const ControlStack = createStackNavigator(
  {
    ControlScreen: {
      screen: ControlScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: (
          <Header navigation={navigation} title="Control" backhome={true} />
        ),
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
    }
  }
);
