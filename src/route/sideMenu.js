import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import SafeAreaView from 'react-native-safe-area-context';
import sideMenuDesign from '../route/sideMenuDesign';
import login from '../component/login';
import home2 from '../component/home2';
import dashBoardBottomRetailer from './dashBoardBottomRetailer';


const sideMenu = createDrawerNavigator({


  home2:{
    screen: home2
}

}, {
  drawerWidth: 250,
  initialRouteName: 'home2',
  contentComponent: sideMenuDesign,
});


export default (sideMenu);

