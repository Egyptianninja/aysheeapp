import { createDrawerNavigator } from 'react-navigation';
import { AppStackNavigator } from './AppStackNav';
import Drawer from '../../componenets/Drawer';

export const AppDrawerNavigator = createDrawerNavigator(
  { Home: AppStackNavigator },
  {
    drawerPosition: 'right',
    contentComponent: Drawer,
    drawerBackgroundColor: 'transparent'
  } as any
);
