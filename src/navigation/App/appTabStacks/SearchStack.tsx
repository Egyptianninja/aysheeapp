import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  ItemScreen,
  SearchScreen,
  ShopsScreen,
  OffersScreen
} from '../../../screens';
import { Header } from '../../../componenets';

export const SearchStack = createStackNavigator(
  {
    SearchScreen: {
      screen: SearchScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: <Header navigation={navigation} title="Search" />,
        headerBackTitle: null
      })
    },

    OffersScreen: {
      screen: OffersScreen,
      navigationOptions: ({ navigation }: any) => ({
        headerBackTitle: null,
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
