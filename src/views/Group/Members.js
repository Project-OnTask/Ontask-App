import React, { useState, useEffect } from 'react';
import {View} from 'react-native';
import {Text,SearchBar,Button} from 'react-native-elements';
import MemberItem from './components/MemberItem';
import Header from '../../components/Header';
import AddMemberModal from './components/AddMemberModal'
import Axios from 'axios';

const Members = props => {
  const [query,setQuery] = useState("")
  const [trig,setTrig] = useState(false)
  const [admins,setAdmins] = useState([])
  const [members,setMembers] = useState([])

  function trigger(){
    setTrig(!trig)
  }

  useEffect( () => {
    Axios.get("/member/"+props.screenProps.groupId+"/admin").then(
      res => {
        setAdmins(res.data)
      }
    ).catch(err => console.log(err))

    Axios.get("/member/"+props.screenProps.groupId).then(
      res => {
        setMembers(res.data)
      }
    ).catch(err => console.log(err))


  },[props.screenProps.groupId,trig])

  return (
    <View>
      <Header
        navigation={props.screenProps.navigation}
        name={props.screenProps.groupData && props.screenProps.groupData.name}
      />
      <View style={{marginTop: 50}}>
        <View style={{display: "flex",flexDirection: "row"}}>
        <SearchBar
        containerStyle={{width: "90%",backgroundColor: "white",borderBottomColor: "white",borderTopColor: "white"}}
        inputContainerStyle={{width: "90%"}}
        onCancel={() => setQuery("")}
        inputStyle={{width: "90%",height: 10,padding: "2%"}}
        placeholder="Search members..."
        onChangeText={text => setQuery(text)}
        value={query}
      />
      <View style={{flexGrow: 1}}></View>
      <AddMemberModal groupId={props.screenProps.groupId} trigger={trigger}/>
        </View>
       
        <Text h4 style={{paddingLeft: '3%'}}>
          Admins
        </Text>
        {admins.length > 0 ? admins.map( admin => 
        <MemberItem 
          name={admin.fname}
          emailHash={admin.emailHash}
        />  
        ) : <Text style={{textAlign: "center"}}>No admins</Text>}
        
        <Text h4 style={{paddingLeft: '3%'}}>
          Members
        </Text>
          {members.length > 0 ? members.map( member => <MemberItem 
          name={member.fname}
          emailHash={member.emailHash}
          />) : <Text style={{textAlign: "center"}}>No members</Text>}
      </View>
    </View>
  );
};

export default Members;
