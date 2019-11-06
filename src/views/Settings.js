import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements'
import Header from '../components/Header';


const Settings = props => {
  return (
    <View>
      <Header navigation={props.navigation} name="Settings" />
   
    </View>
  );
};

export default Settings;
