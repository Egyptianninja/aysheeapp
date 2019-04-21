import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AppDrawerNavigator } from './App/AppNavigation';
import { LoadStackNavigator } from './Load/LoadNavigation';
import { ControlStack } from './Control/ControlStack';

const startNavigator = createSwitchNavigator({
  Loading: LoadStackNavigator,
  App: AppDrawerNavigator,
  Control: ControlStack
});

export default createAppContainer(startNavigator);
