import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { AppDrawerNavigator } from './App/AppNavigation';
import { LoadStackNavigator } from './Load/LoadNavigation';

const startNavigator = createSwitchNavigator({
  Loading: LoadStackNavigator,
  App: AppDrawerNavigator
});

export default createAppContainer(startNavigator);
