import React, { Component } from 'react';
import { View,Image, ToastAndroid } from 'react-native' 
import AsyncStorage from "@react-native-community/async-storage"
import axios from 'axios'

class CheckAuth extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
      }
    
     _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('token');
        if(userToken){
            axios.get('/auth/user/me',{
                headers: {
                    'Authorization': userToken
                }
            }).then(
               res => {
                 AsyncStorage.setItem("id", res.data.id.toString()).then(async val => {
                     this.props.navigation.navigate('Dashboard');
                 });
                }
              ).catch(async err => {
                ToastAndroid.show('Error occured!', ToastAndroid.SHORT);
              })
        }
        else{
            await AsyncStorage.removeItem('token')
            this.props.navigation.navigate('Signup');
        }
      };
    
    render() {
        return (
            <View style={{display: "flex",alignItems: "center",height: "100%",justifyContent: "center"}}>
                   <Image
          style={{width: 200, height: 200}}
          source={require('../assets/logo.png')}
        />
            </View>
        );
    }
}

export default CheckAuth;