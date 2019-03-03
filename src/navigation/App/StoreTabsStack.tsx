import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation';

import { UserItemsScreen, StoreOfferScreen } from '../../screens';
export const StoreTabs = createMaterialTopTabNavigator(
  {
    StoreOfferScreen: {
      screen: StoreOfferScreen,
      navigationOptions: ({ navigation }: any) => ({
        params: { user: navigation.state.params.user },
        title: 'OFFERS',
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: '#777',
        headerTitleStyle: { fontSize: 20, color: '#000' }
      })
    },
    UserItemsScreen: {
      screen: UserItemsScreen,
      navigationOptions: ({ navigation }: any) => ({
        params: { user: navigation.state.params.user },
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
      header: null,
      params: { user: navigation.state.params.user }
    })
  }
});
