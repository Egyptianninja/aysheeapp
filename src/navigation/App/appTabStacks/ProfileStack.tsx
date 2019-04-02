import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import {
  EditProfileScreen,
  MyFavScreen,
  UpgradeToStore,
  MyProfileScreen,
  ItemScreen,
  PhoneScreen,
  CodeScreen
} from '../../../screens';
import { Header } from '../../../componenets';
import HeaderNoBack from '../../../componenets/Common/HeaderNoback';
import { words } from '../../../store/getStore';
export const ProfileStack = createStackNavigator(
  {
    MyProfileScreen: {
      screen: MyProfileScreen,
      navigationOptions: ({ navigation }: any) => {
        const word = words();

        return {
          header: <HeaderNoBack navigation={navigation} title={word.profile} />,
          headerBackTitle: null
        };
      }
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
            // title={navigation.getParam('title')}
            title="Edit Profile"
          />
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
