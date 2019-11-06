import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import CheckAuth from './CheckAuth'
import Signup from '../views/Signup'
import VerifyMobile from '../views/VerifyMobile'
import Task from '../views/Task/Task'
import Group from '../views/Group/Group'
import DrawerNavigator from './DrawerNavigator'

const AppNavigator = createStackNavigator({
  CheckAuth: {
    screen: CheckAuth,
    navigationOptions: {
      header:null
    }
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header:null
    }
  },
  VerifyMobile: {
    screen: VerifyMobile,
    navigationOptions: {
      header:null
    }
  },
  Task: {
    screen: Task
  },
  Group: {
    screen: Group,
    navigationOptions: {
      header:null
    }
  },
  DrawerNav: {
    screen: DrawerNavigator,
    navigationOptions: {
      header:null
   }
  }
},{
  initialRouteName: "CheckAuth"
});

export default AppNavigator;