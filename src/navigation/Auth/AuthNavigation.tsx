import { createStackNavigator } from 'react-navigation';

import { PhoneScreen, CodeScreen, NameScreen } from '../../screens';

export const AuthStackNavigator = createStackNavigator({
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
  },
  NameScreen: {
    screen: NameScreen,
    navigationOptions: ({ navigation }: any) => ({
      header: null
    })
  }
});
