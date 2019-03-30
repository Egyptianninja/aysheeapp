import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  ItemScreen,
  SearchScreen,
  ShopsScreen,
  OffersScreen,
  ProfileScreen
} from '../../../screens';
import { Header } from '../../../componenets';
import SearchHeader from '../../../componenets/HomeScreen/SearchHeader';
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
