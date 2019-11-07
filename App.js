/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer } from 'react-navigation';
import StackNavigator from './src/utils/StackNavigator'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

//prod: 'https://ontask-back.herokuapp.com/api'
//dev: 'http://172.29.208.1:8080/api'

axios.defaults.baseURL = 'http://172.29.208.1:8080/api'
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

axios.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        config.headers.Authorization = "Bearer "+token
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  );

export default createAppContainer(StackNavigator);

