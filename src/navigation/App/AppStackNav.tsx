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
import { StyleSheet } from '../../utils';

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
        title: 'اضافة اعلان جديد',
        headerBackTitle: null
      })
    },
    UpgradeToStore: {
      screen: UpgradeToStore,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('title'),
        headerBackTitle: null
      })
    },
    AddClassifiedScreen: {
      screen: AddClassifiedScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('item').name,
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
        headerBackTitle: null
      })
    },
    AddRealEstateScreen: {
      screen: AddRealEstateScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('item').name,
        headerBackTitle: null
      })
    },
    AddCarScreen: {
      screen: AddCarScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('item').name,
        headerBackTitle: null
      })
    },
    AddPartsScreen: {
      screen: AddPartsScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('item').name,
        headerBackTitle: null
      })
    },
    AddJobScreen: {
      screen: AddJobScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('item').name,
        headerBackTitle: null
      })
    },
    MyFavScreen: {
      screen: MyFavScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: 'المفضلة',
        headerBackTitle: null
      })
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: navigation.getParam('user').name,
        headerBackTitle: null
      })
    },
    NotificationsScreen: {
      screen: NotificationsScreen,
      navigationOptions: () => ({
        headerBackTitle: null
      })
    },
    ShopsScreen: {
      screen: ShopsScreen,
      navigationOptions: () => ({
        title: 'قسم المتاجر',
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

const styles = StyleSheet.create({
  imageView: {
    marginHorizontal: 10,
    height: 36,
    width: 36,
    borderRadius: 18,
    borderColor: '#eee',
    borderWidth: 1,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  headerStyle: {
    height: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: '#777',
    shadowOpacity: 0.1
  },
  headerTitleStyle: {
    fontFamily: 'cairo-regular',
    fontSize: 18,
    color: '#000'
  },
  mainheaderTitleStyle: {
    fontFamily: 'multaqa-font',
    fontSize: 18,
    color: '#000'
  },
  icon: {
    paddingTop: 5,
    paddingHorizontal: 10
  },
  imageViewChat: {
    backgroundColor: 'red',
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 50,
    marginBottom: 2
  }
});
