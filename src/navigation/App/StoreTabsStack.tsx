import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';

import { UserItemsScreen, StoreOfferScreen } from '../../screens';
const StoreTabs = createMaterialTopTabNavigator(
  {
    StoreOfferScreen: {
      screen: StoreOfferScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: 'OFFERS',
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#777',
        headerTitleStyle: { fontSize: 20, color: '#000' }
      })
    },
    UserItemsScreen: {
      screen: UserItemsScreen,
      navigationOptions: ({ navigation }: any) => ({
        title: 'ITEMS',
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
  StoreTabs: {
    screen: StoreTabs,
    navigationOptions: ({ navigation, tintColor }: any) => ({
      header: null
    })
  }
});
