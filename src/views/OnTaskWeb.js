import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements'
import Header from '../components/Header';
import AsyncStorage from "@react-native-community/async-storage"
import QRCodeScanner from 'react-native-qrcode-scanner';
import Axios from 'axios';
import { withNavigationFocus } from 'react-navigation'

const Settings = props => {
  const [token,setToken] = useState("")

  const getToken = async () => {
    const token = await AsyncStorage.getItem("token")
    setToken(token)
  }

  useEffect(
    () => {
    getToken()
    },[]
  )

  const onSuccess = e => {
    console.log("event: ",e)
    Axios.get("/auth/user/me").then(res => {
      Axios.post("/auth/qr-signin/mobile",{
        deviceId: e.data,
        userId: res.data.id,
        token: token
      })
    }).catch(err => console.log(err))
   
  }
  
  return (
    <View>
      <Header navigation={props.navigation} name="Settings" />
   <View style={{marginTop: 55}}>
     <Text style={{textAlign: "center",fontSize: 20,margin: 5}}>
       Go to <Text style={{fontWeight: "bold"}}>ontask.com/login</Text> and scan the QR code.
      </Text>
     <View style={{position: "absolute",top: 130}}>
     {props.isFocused ? 
     <QRCodeScanner
     onRead={onSuccess}
   
   /> : <></>}
     </View>
   </View>
    </View>
  );
};

export default withNavigationFocus(Settings);
