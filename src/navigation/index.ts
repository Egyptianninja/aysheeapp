import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { AppDrawerNavigator } from './App/AppNavigation';
import { AuthStackNavigator } from './Auth/AuthNavigation';
import { LoadStackNavigator } from './Load/LoadNavigation';

const startNavigator = createSwitchNavigator({
  Loading: LoadStackNavigator,
  App: AppDrawerNavigator,
  Auth: AuthStackNavigator
});

export default createAppContainer(startNavigator);
