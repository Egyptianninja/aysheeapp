import { createDrawerNavigator } from 'react-navigation';
import { AppStackNavigator } from './AppStackNav';
import Drawer from '../../componenets/Drawer';

export const AppDrawerNavigator = createDrawerNavigator(
  { Home: AppStackNavigator },
  {
    drawerPosition: 'left',
    contentComponent: Drawer,
    drawerBackgroundColor: 'transparent'
  } as any
);
