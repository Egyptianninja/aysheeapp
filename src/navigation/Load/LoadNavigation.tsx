import { createStackNavigator } from 'react-navigation';
import { LoadScreen } from '../../screens';

export const LoadStackNavigator = createStackNavigator({
  LoadScreen: {
    screen: LoadScreen,
    navigationOptions: () => ({
      headerTintColor: '#555'
    })
  }
});
