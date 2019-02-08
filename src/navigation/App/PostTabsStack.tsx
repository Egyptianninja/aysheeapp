import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { getLang } from '../../utils';
const onlineposts = getLang() === 'ar' ? 'الاعلانات المنشورة' : 'Online Posts';
const offlineposts =
  getLang() === 'ar' ? 'الاعلانات غير المنشورة' : 'Offline Posts';

import { MyOnlinePostsScreen, MyOfflinePostsScreen } from '../../screens';
const PostTabs = createMaterialTopTabNavigator(
  {
    MyOnlinePostsScreen: {
      screen: MyOnlinePostsScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: onlineposts,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#777',
        headerTitleStyle: { fontSize: 20, color: '#000' }
      })
    },
    MyOfflinePostsScreen: {
      screen: MyOfflinePostsScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: offlineposts,
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#777',
        headerTitleStyle: { fontSize: 20, color: '#000' }
      })
    }
  },
  {
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#6FA7D5',
      inactiveTintColor: '#777',
      labelStyle: {
        fontSize: 16
      },
      indicatorStyle: {
        backgroundColor: '#6FA7D5'
      },
      style: {
        backgroundColor: '#efefef'
      }
    }
  }
);

export default createStackNavigator({
  PostTabs: {
    screen: PostTabs,
    navigationOptions: ({ navigation, tintColor }: any) => ({
      header: null
    })
  }
});
