import { createStackNavigator } from "react-navigation";

import { PhoneScreen, CodeScreen, NameScreen } from "../../screens";

export const AuthStackNavigator = createStackNavigator({
  PhoneScreen: {
    screen: PhoneScreen,
    navigationOptions: () => ({
      header: null
    })
  },
  CodeScreen: {
    screen: CodeScreen,
    navigationOptions: () => ({
      headerTintColor: "#555"
    })
  },
  NameScreen: {
    screen: NameScreen,
    navigationOptions: () => ({
      headerTintColor: "#555"
    })
  }
});
