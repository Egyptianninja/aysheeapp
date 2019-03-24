import { createDrawerNavigator } from 'react-navigation';
import AppTabNavigation from './AppTabNavigation';
import Drawer from '../../componenets/Drawer';

export const AppDrawerNavigator = createDrawerNavigator(
  { Home: AppTabNavigation },
  {
    drawerPosition: 'left',
    contentComponent: Drawer,
    drawerBackgroundColor: 'transparent'
  } as any
);
