import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from '../../utils';
import PostTabsStack from './PostTabsStack';
import StoreTabsStack from './StoreTabsStack';
import {
  HomeScreen,
  ItemScreen,
  ItemScreenUser,
  MyProfileScreen,
  ChoiseScreen,
  NotificationsScreen,
  AddClassifiedScreen,
  AddRealEstateScreen,
  AddServiceScreen,
  AddJobScreen,
  AddCarScreen,
  AddPartsScreen,
  UserProfileScreen,
  MyFavScreen,
  CameraScreen,
  AddOfferScreen,
  UpgradeToStore
} from '../../screens';
import HomeHeader from '../../componenets/HomeScreen/HomeHeader';
import OfferScreen from '../../utils/swiper';
import { Constants } from 'expo';
import StoreOfferScreen from '../../screens/App/user/StoreOfferScreen';

export const AppStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }: any) => ({
      header: <HomeHeader navigation={navigation} />,
      headerBackTitle: null
    })
  },
  OfferScreen: {
    screen: OfferScreen,
    navigationOptions: ({ navigation }: any) => ({
      headerBackTitle: null
    })
  },
  ItemScreen: {
    screen: ItemScreen,
    navigationOptions: ({ navigation }: any) => ({
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },

  ItemScreenUser: {
    screen: ItemScreenUser,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('post').title,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },

  ChoiseScreen: {
    screen: ChoiseScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: 'اضافة اعلان جديد',
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },
  UpgradeToStore: {
    screen: UpgradeToStore,
    navigationOptions: ({ navigation }: any) => ({
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },
  AddClassifiedScreen: {
    screen: AddClassifiedScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },
  AddOfferScreen: {
    screen: AddOfferScreen,
    navigationOptions: ({ navigation }: any) => ({
      // title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },
  AddServiceScreen: {
    screen: AddServiceScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },
  AddRealEstateScreen: {
    screen: AddRealEstateScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },
  AddCarScreen: {
    screen: AddCarScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },
  AddPartsScreen: {
    screen: AddPartsScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },
  AddJobScreen: {
    screen: AddJobScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null
    })
  },
  MyPostsScreen: {
    screen: PostTabsStack,
    navigationOptions: () => ({
      title: 'منشوراتي',
      headerTintColor: '#555',
      headerBackTitle: null
    })
  },
  MyFavScreen: {
    screen: MyFavScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: 'المفضلة',
      headerTintColor: '#555',
      headerBackTitle: null
    })
  },
  UserProfileScreen: {
    screen: UserProfileScreen,
    // screen: StoreTabsStack,
    // screen: StoreOfferScreen,
    navigationOptions: ({ navigation }: any) => ({
      user: navigation.getParam('user'),
      headerTintColor: '#555',
      headerBackTitle: null
    })
  },
  NotificationsScreen: {
    screen: NotificationsScreen,
    navigationOptions: () => ({
      headerTintColor: '#555',
      headerBackTitle: null
    })
  },
  CameraScreen: {
    screen: CameraScreen,
    navigationOptions: () => ({
      headerTintColor: '#555',
      headerBackTitle: null
    })
  },
  Profile: {
    screen: MyProfileScreen,
    navigationOptions: ({ navigation }: any) => ({
      headerStyle: styles.headerStyle,
      headerTintColor: '#eee',
      headerTitleStyle: styles.headerTitleStyle,
      headerBackTitle: null,
      headerLeft: (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="ios-arrow-back"
              size={33}
              style={styles.icon}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      )
    })
  }
});

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
