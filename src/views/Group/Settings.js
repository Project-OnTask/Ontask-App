import React, { useState, useEffect } from 'react';
import {View,Switch, Alert} from 'react-native';
import {Text, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import Header from '../../components/Header';
import Axios from 'axios';

const Settings = props => {
  const [isPrivate,setPrivacyStatus] = useState(false)
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [error,setError] = useState("")

  useEffect(() => {
    Axios.get('/groups/'+props.screenProps.groupId).then(
      res => {
        setName(res.data.name)
        setDescription(res.data.description)
      }
    )
  },[props.screenProps.groupId])

  function togglePrivacyStatus(){
    setPrivacyStatus(!isPrivate)
  }

  function updateGroupSettings(){
    Axios.get('/auth/user/me').then(res => {
      Axios.put("/groups/"+props.screenProps.groupId,{
        editedBy: res.data.id,
        name: name,
        description: description
      }).then(
        res => {
          if(res.status === 200){
            Alert.alert("Group settings updated")
          }
        }
        ).catch(err => {
          console.log(err)
          setError("An error occured. Please try again")
        })
    }).catch(err => console.log(err))
  }

  return (
    <View>
      <Header
        navigation={props.screenProps.navigation}
        name={props.screenProps.groupData && props.screenProps.groupData.name}
      />
      <View style={{marginTop: 50}}>
      <View style={{display: "flex",flexDirection: "row",marginLeft: "3%",marginBottom: "2%"}}>
        <Text h4>Settings</Text>
        <View style={{flexGrow: 1}}></View>
        <Icon name="check" size={20} onPress={updateGroupSettings} style={{paddingTop: "2%",marginRight: "3%"}}/>
      </View>
      {error ? <Text style={{textAlign: "center",color: "red"}}>{error}</Text> : <></>}
      <Input 
        label="Group name"
        onChangeText={text => setName(text)}
      />
      <Input 
        label="Group Description"
        numberOfLines={2}
        blurOnSubmit={true}
        multiline={true}
        onChangeText={text => setDescription(text)}
      />
      <View style={{display: "flex",flexDirection: "row",marginTop: "3%",marginLeft: "3%"}}>
        <Text h5 style={{fontSize: 16,color: "gray",fontWeight: "bold"}}>Privacy</Text>
        <View style={{flexGrow: 1}}></View>
        <Switch value={isPrivate} onValueChange={togglePrivacyStatus} />
        <Text style={{marginTop: "2%",color: "gray",marginRight: "3%"}}>{isPrivate ? "Private" : "Public"}</Text>
      </View>
      </View>
    </View>
  );
};

export default Settings;
