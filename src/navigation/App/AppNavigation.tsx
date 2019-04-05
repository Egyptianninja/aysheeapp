import { createDrawerNavigator } from 'react-navigation';
import Drawer from '../../componenets/Drawer';
import AppTabNavigation from './AppTabNavigation';

export const AppDrawerNavigator = createDrawerNavigator(
  { Home: AppTabNavigation },
  {
    drawerPosition: 'left',
    contentComponent: Drawer,
    drawerType: 'slide',
    overlayColor: 'rgba(0,0,0,0)',
    drawerWidth: 275,
    drawerBackgroundColor: 'transparent'
  } as any
);
