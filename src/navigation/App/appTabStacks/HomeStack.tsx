import * as React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Header } from '../../../componenets';
import {
  AddCarScreen,
  AddClassifiedScreen,
  AddJobScreen,
  AddOfferScreen,
  AddPartsScreen,
  AddRealEstateScreen,
  AddServiceScreen,
  CameraScreen,
  CategoryScreen,
  ChoiseScreen,
  CodeScreen,
  EditProfileScreen,
  HomeScreen,
  ItemScreen,
  MyFavScreen,
  OffersScreen,
  PhoneScreen,
  ProfileScreen,
  ShopsScreen,
  UpgradeToStore,
  ContactScreen
} from '../../../screens';

export const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: () => ({
        // header: <HomeHeader navigation={navigation} />,
        header: null,
        headerBackTitle: null
      })
    },
    CategoryScreen: {
      screen: CategoryScreen,
      navigationOptions: () => ({
        header: null,
        headerBackTitle: null
      })
    },

    OffersScreen: {
      screen: OffersScreen,
      navigationOptions: () => ({
        headerBackTitle: null,
        tabBarVisible: false,
        drawerLockMode: 'locked-closed'
      })
    },
    ItemScreen: {
      screen: ItemScreen,
      navigationOptions: () => ({
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
            backhome={true}
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

    ContactScreen: {
      screen: ContactScreen,
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
            backhome={true}
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
    }
  }
);
