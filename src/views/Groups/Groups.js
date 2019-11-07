import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Text} from 'react-native-elements';
import PopupMenu from '../../components/DotBtnMenu'
import NewGroupModal from './components/NewGroupModal'
import AsyncStorage from '@react-native-community/async-storage'
import HTML from 'react-native-render-html';

import Header from '../../components/Header';
import Axios from 'axios';

function GroupItem(props) {
  // onPopupEvent = (eventName, index) => {
  //     if (eventName !== 'itemSelected') return
  //     if (index === 0){
  //       if(this.props.role==="admin"){
  //         this.removeAdmin()
  //       }
  //       else{
  //         this.setAdmin()
  //       }
  //     }
  //     else {

  //         this.removeFromGroup()   }
  //   }

  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Group',{
      groupId: props.id
    })}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          elevation: 5,
          alignItems: 'center',
          paddingTop: "2%",
          paddingBottom: "2%",
          height: 50,
        }}>
        <View style={{padding: '3%'}}>
          <Text h5 style={{fontSize: 16,paddingBottom: "2%"}}>
            {props.name}
          </Text>
          <HTML 
            html={props.lastActivity} 
            alterData={
              (node) => {
                let { parent, data } = node;
                if (parent && parent.name === 'p') {
                    // Texts elements are always children of wrappers, this is why we check the tag
                    // with "parent.name" and not "name"
                    return data.slice(0,20)+"...";
                }
                // Don't return anything (eg a falsy value) for anything else than the <h1> tag so nothing is altered
            }
            } 
          />
          <Text>{}</Text>
        </View>
        <View style={{flexGrow: 1}}></View>
        <PopupMenu actions={['Revoke access']} onPress={(event, index) => {}} />
      </View>
    </TouchableOpacity>
  );
}

const Groups = props => {
  const [groups,setGroups] = useState([])
  const [trig,setTrig] = useState(false)

  useEffect(() => {
    Axios.get('/auth/user/me').then(
      res => {
        Axios.get('/'+ res.data.id+'/groups').then(res => {
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
    paddingBottom: '1%',
  }
});

export default Groups;
