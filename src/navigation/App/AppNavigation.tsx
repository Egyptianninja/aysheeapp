import { createDrawerNavigator } from 'react-navigation';
import AppTabNavigation from './AppTabNavigation';
import Drawer from '../../componenets/Drawer';

export const AppDrawerNavigator = createDrawerNavigator(
  { Home: AppTabNavigation },
  {
    drawerPosition: 'left',
    contentComponent: Drawer,
    drawerType: 'slide',
    drawerWidth: 275,
    drawerBackgroundColor: 'transparent'
  } as any
);
