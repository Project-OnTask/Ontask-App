import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Text,SearchBar} from 'react-native-elements';
import PopupMenu from '../../components/DotBtnMenu'
import NewGroupModal from './components/NewGroupModal'
import AsyncStorage from '@react-native-community/async-storage'
import HTML from 'react-native-render-html';

import Header from '../../components/Header';
import Axios from 'axios';

function GroupItem(props) {
  const onPopupEvent = (eventName, index) => {
      if (eventName !== 'itemSelected') return
      if (index === 0){
        
      }
      else if(index === 1){
          this.removeFromGroup()   
      }
    }

    function leaveGroup(){

    }

    function reportGroup(){

    }

  return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: "3%",
          height: 50,
        }}>
        <View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Group',{
      groupId: props.id
    })}>
          <Text h5 style={{fontSize:15,paddingBottom: "1%",fontWeight: "bold"}}>
            {props.name}
          </Text>
          <HTML 
            html={props.lastActivity.slice(0,30)+"..."}  
          />
              </TouchableOpacity>
          <Text>{}</Text>
        </View>
        <View style={{flexGrow: 1}}></View>
        <View style={{marginTop: "-6%"}}>
        <PopupMenu actions={['Leave group','Report Group']} onPress={(event, index) => {}} />
        </View>
      </View>
  );
}

const Groups = props => {
  const [groups,setGroups] = useState([])
  const [trig,setTrig] = useState(false)

  useEffect(() => {
    Axios.get('/auth/user/me').then(
      res => {
        Axios.get('/'+ res.data.id+'/groups').then(res => {
          console.log("groups: ",res.data)
          setGroups(res.data)
        }).catch(err => console.log(err))
      }
    ).catch(err => console.log(err))
  },[trig])

  const triggerUpdate = () => {
    setTrig(!trig)
  }

  return (
    <View>
      <Header navigation={props.navigation} name="Groups" />
      <View style={{marginTop: 50}}>
        <View style={screenStyles.topic}>
        <SearchBar
        containerStyle={{width: "90%",backgroundColor: "white",borderBottomColor: "white",borderTopColor: "white"}}
        inputContainerStyle={{width: "90%"}}
        //onCancel={() => setQuery("")}
        inputStyle={{width: "90%",height: 10,padding: "2%"}}
        placeholder="Search groups..."
        //onChangeText={text => setQuery(text)}
        //value={query}
      />
          <View style={{flexGrow: 1}} />
            <NewGroupModal triggerUpdate={triggerUpdate} navigation={props.navigation}/>
        </View>
        {groups.length > 0 ? groups.map((group,index) => {
          return (
            <GroupItem 
              key={index}
              id={group.groupId}
              name={group.name}
              lastActivity={group.lastActivity}  
            navigation={props.navigation} />
          ) 
        }): <Text style={{color: "gray",padding: "2%",textAlign: "center"}}>No groups. Create a new group</Text>}
      </View>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  topic: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '1%',
    marginLeft: "1%",
    paddingBottom: '1%',
  }
});

export default Groups;
