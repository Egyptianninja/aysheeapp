import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  EditProfileScreen,
  MyFavScreen,
  UpgradeToStore,
  MyProfileScreen
} from '../../../screens';
import { Header } from '../../../componenets';
import { user } from '../../../store/getStore';
export const ProfileStack = createStackNavigator(
  {
    ProfileScreen: {
      screen: MyProfileScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: <Header navigation={navigation} title={user().user.name} />,
        headerBackTitle: null
      })
    },
    UpgradeToStore: {
      screen: UpgradeToStore,
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

    MyFavScreen: {
      screen: MyFavScreen,
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

    EditProfileScreen: {
      screen: EditProfileScreen,
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
