import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeHeader from '../../../componenets/HomeScreen/HomeHeader';
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
  HomeScreen,
  ItemScreen,
  OffersScreen,
  ShopsScreen,
  CategoryScreen,
  ProfileScreen,
  UpgradeToStore,
  MyFavScreen,
  EditProfileScreen
} from '../../../screens';
import { Header } from '../../../componenets';

export const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }: any) => ({
        header: <HomeHeader navigation={navigation} />,
        headerBackTitle: null
      })
    },
    CategoryScreen: {
      screen: CategoryScreen,
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
        header: (
          <Header
            navigation={navigation}
            title={navigation.getParam('title')}
          />
        ),
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
    }
  }
);
