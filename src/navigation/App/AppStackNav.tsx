import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from '../../utils';
import PostTabsStack from './PostTabsStack';
import {
  HomeScreen,
  ItemScreen,
  MyProfileScreen,
  ChoiseScreen,
  NotificationsScreen,
  AddClassifiedScreen,
  AddRealEstateScreen,
  AddServiceScreen,
  AddJobScreen,
  AddCarScreen,
  AddRequestServiceScreen,
  AddJobRequestScreen,
  UserProfileScreen
} from '../../screens';
import HomeHeader from '../../componenets/HomeScreen/HomeHeader';

export const AppStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }: any) => ({
      header: <HomeHeader navigation={navigation} />
    })
  },
  ItemScreen: {
    screen: ItemScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('post').title,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle
    })
  },
  ChoiseScreen: {
    screen: ChoiseScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: 'اضافة اعلان جديد',
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle
    })
  },
  AddClassifiedScreen: {
    screen: AddClassifiedScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle
    })
  },
  AddServiceScreen: {
    screen: AddServiceScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle
    })
  },
  AddRequestServiceScreen: {
    screen: AddRequestServiceScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle
    })
  },
  AddRealEstateScreen: {
    screen: AddRealEstateScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle
    })
  },
  AddCarScreen: {
    screen: AddCarScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle
    })
  },
  AddJobScreen: {
    screen: AddJobScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle
    })
  },
  AddJobRequestScreen: {
    screen: AddJobRequestScreen,
    navigationOptions: ({ navigation }: any) => ({
      title: navigation.getParam('item').name,
      headerStyle: styles.headerStyle,
      headerTintColor: '#555',
      headerTitleStyle: styles.headerTitleStyle
    })
  },
  MyPostsScreen: {
    screen: PostTabsStack,
    navigationOptions: () => ({
      title: 'منشوراتي',
      headerTintColor: '#555'
    })
  },
  UserProfileScreen: {
    screen: UserProfileScreen,
    navigationOptions: () => ({
      headerTintColor: '#555'
    })
  },
  NotificationsScreen: {
    screen: NotificationsScreen,
    navigationOptions: () => ({
      headerTintColor: '#555'
    })
  },
  Profile: {
    screen: MyProfileScreen,
    navigationOptions: ({ navigation }: any) => ({
      headerStyle: styles.headerStyle,
      headerTintColor: '#eee',
      headerTitleStyle: styles.headerTitleStyle,
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
    backgroundColor: '#fff',
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#555',
    shadowOpacity: 0.1
  },
  headerTitleStyle: {
    fontFamily: 'cairo-regular',
    fontSize: 20,
    color: '#000'
  },
  mainheaderTitleStyle: {
    fontFamily: 'multaqa-font',
    fontSize: 20,
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
