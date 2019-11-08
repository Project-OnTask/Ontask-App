import React, { useState,useEffect} from 'react'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AIcon from 'react-native-vector-icons/AntDesign'
import About from './About'
import Tasks from './Tasks'
import Notices from './Notices'
import Members from './Members'
import Axios from 'axios'
import Settings from './Settings'


const TabNavigator = createBottomTabNavigator({
  About:{
    screen:About,
    navigationOptions: {
      tabBarLabel:"About",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="info-circle" style={{color: tintColor}} size={20}/>
      )
    },
  },
  Tasks:{
    screen:Tasks,
    navigationOptions: {
      tabBarLabel:"Tasks",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="tasks" style={{color: tintColor}} size={20}/>
      )
    },
  },
  Notices:{
    screen:Notices,
    navigationOptions: {
      tabBarLabel:"Notices",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="sticky-note" style={{color: tintColor}} size={20}/>
      )
    },
  },
  Members:{
    screen:Members,
    navigationOptions: {
      tabBarLabel:"Members",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="user" style={{color: tintColor}} size={20}/>
      )
    },
  }
  ,
              Settings:{
                screen: Settings,
                navigationOptions: {
                  tabBarLabel:"Settings",
                  tabBarIcon: ({ tintColor }) => (
                    <AIcon name="setting" style={{color: tintColor}} size={20}/>
                  )
                },
              }
});

let GroupTabs = createAppContainer(TabNavigator)

export default function Group(props){
  const [groupData, setGroupData] = useState({})
  const [isAdmin,setIsAdmin] = useState(false)
  
  useEffect( () => {
    Axios.get('/auth/user/me').then(res => {

      Axios.get('/groups/'+props.navigation.getParam('groupId')).then(res => {
        console.log("group: ",res.data)
        setGroupData(res.data)
      }).catch(err => console.log(err))
  
      Axios.get("/member/"+props.navigation.getParam('groupId')+"/is-admin/"+res.data.id).then(
        res => {
        setIsAdmin(res.data)    
        }
      ).catch(err => console.log(err))
  

    }).catch(err => console.log(err))
   },[props.navigation.getParam('groupId')])

  return(
    
    <GroupTabs screenProps={{
      navigation: props.navigation,
      groupId: props.navigation.getParam('groupId'),
      isAdmin: isAdmin,
      groupData: groupData
    }}/>
  )
}