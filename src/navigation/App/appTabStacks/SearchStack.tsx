import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Header } from '../../../componenets';
import {
  ItemScreen,
  OffersScreen,
  ProfileScreen,
  SearchScreen,
  ShopsScreen
} from '../../../screens';
export const SearchStack = createStackNavigator(
  {
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: null,
        headerBackTitle: null
      })
    },

    OffersScreen: {
      screen: OffersScreen,
      navigationOptions: ({ navigation }: any) => ({
        headerBackTitle: null,
        tabBarVisible: false,
        drawerLockMode: 'locked-closed'
      })
    },

    ItemScreen: {
      screen: ItemScreen,
      navigationOptions: ({ navigation }: any) => ({
        headerBackTitle: null
      })
    },

    ShopsScreen: {
      screen: ShopsScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: (
          <Header
            navigation={navigation}
            title={navigation.getParam('title')}
          />
        ),
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
      // headerBackImage: <BackIcon />
    }
  }
);
