import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeHeader from '../../componenets/HomeScreen/HomeHeader';
import {
  AddCarScreen,
  AddClassifiedScreen,
  AddJobScreen,
  AddOfferScreen,
  AddPartsScreen,
  AddRealEstateScreen,
  AddServiceScreen,
  CameraScreen,
  ChoiseScreen,
  EditProfileScreen,
  HomeScreen,
  ItemScreen,
  MyFavScreen,
  NotificationsScreen,
  OffersScreen,
  ProfileScreen,
  ShopsScreen,
  UpgradeToStore
} from '../../screens';
import { StyleSheet, rtlos } from '../../utils';
import { BackIcon, Header } from '../../componenets';

export const AppStackNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: <HomeHeader navigation={navigation} />,
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

    ChoiseScreen: {
      screen: ChoiseScreen,
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
    AddClassifiedScreen: {
      screen: AddClassifiedScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('item').name,
        header: (
          <Header
            navigation={navigation}
            title={navigation.getParam('item').name}
          />
        ),
        headerBackTitle: null
      })
    },
    AddOfferScreen: {
      screen: AddOfferScreen,
      navigationOptions: ({ navigation }: any) => ({
        headerBackTitle: null
      })
    },
    AddServiceScreen: {
      screen: AddServiceScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('item').name,
        header: (
          <Header
            navigation={navigation}
            title={navigation.getParam('item').name}
          />
        ),
        headerBackTitle: null
      })
    },
    AddRealEstateScreen: {
      screen: AddRealEstateScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('item').name,
        header: (
          <Header
            navigation={navigation}
            title={navigation.getParam('item').name}
          />
        ),
        headerBackTitle: null
      })
    },
    AddCarScreen: {
      screen: AddCarScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('item').name,
        header: (
          <Header
            navigation={navigation}
            title={navigation.getParam('item').name}
          />
        ),
        headerBackTitle: null
      })
    },
    AddPartsScreen: {
      screen: AddPartsScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('item').name,
        header: (
          <Header
            navigation={navigation}
            title={navigation.getParam('item').name}
          />
        ),
        headerBackTitle: null
      })
    },
    AddJobScreen: {
      screen: AddJobScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: (
          <Header
            navigation={navigation}
            title={navigation.getParam('item').name}
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
    NotificationsScreen: {
      screen: NotificationsScreen,
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
    CameraScreen: {
      screen: CameraScreen,
      navigationOptions: () => ({
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
