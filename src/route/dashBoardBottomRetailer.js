import React from 'react';
import { StyleSheet, Picker, Text, View, Image, ImageBackground, KeyboardAvoidingView, Dimensions, TouchableOpacity, FlatList, Platform } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import events from './../component/events';
import mosque from './../component/mosque';
import cause from './../component/cause';
import halal from './../component/halal';
import home2 from './../component/home2';
import sideMenu from '../route/sideMenu'

const TabScreens = createMaterialBottomTabNavigator({
    home2:{
        screen: home2,
        navigationOptions:  {
            title:'DUA',
            // tabBarLabel:'FEED',
            // tabBarIcon: ({ tinColor}) => {
            //     <Image source={require('../image/Logo3.png')} style={{width:20, height:20}} />

            // }
        }
    },
    events:{
        screen: events,
        navigationOptions:  {
            title:'EVENTS',
        }
    },
    mosque:{
        screen: mosque,
        navigationOptions:  {
            title:'MOSQUE',
        }
    },
    cause:{
        screen: cause,
        navigationOptions:  {
            title:'CAUSE',
        }
    },
    halal:{
        screen: halal,
        navigationOptions:  {
            title:'HALAL',
        }
    },

}, {
    order: ['events', 'mosque', 'home2', 'cause', 'halal'],
    // initialRouteName: 'home2',
    activeColor: '#00cb9c',
    
    inactiveColor: '#9e9e9e',
    barStyle: { backgroundColor: '#fdffff' },
  },);

export default (TabScreens);