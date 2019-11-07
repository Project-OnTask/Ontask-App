import React, {useEffect, useState} from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import Axios from 'axios';
import FIcon from 'react-native-vector-icons/FontAwesome5'
import ZIcon from 'react-native-vector-icons/Zocial'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import EditBioModal from './components/EditBioModal'
import EditLinksModal from './components/EditLinksModal'
import EditEducationModal from './components/EditEducationModal'
import EditWorkModal from './components/EditWorkModal'

import {Card} from 'react-native-elements';

const linkItems = [
    {
        icon: <FIcon name="mobile-alt" size={15} style={{marginRight: "5%"}}/>,
        name: "mobile"
    },
    {
        icon: <FIcon name="link" size={15} style={{marginRight: "5%"}}/>,
        name: "websiteLink"
    },
    {
        icon: <FIcon name="linkedin" size={15} style={{marginRight: "5%"}}/>,
        name: "linkedInLink"
    },
    {
        icon: <FIcon name="github" size={15} style={{marginRight: "5%"}}/>,
        name: "githubLink"
    },
    {
        icon: <ZIcon name="stackoverflow" size={15} style={{marginRight: "5%"}}/>,
        name: "stackOverflowLink"
    }
]

const Profile = props => {
  const [userData, setUserData] = useState([]);
  const [isEditable,setEditable] = useState(false)
  const [trigger,setTrigger] = useState(false)
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    Axios.get('/auth/user/me')
      .then(res => {
        if(props.navigation.getParam("id") === null || res.data.id === props.navigation.getParam("id")){
          setEditable(true)
        }
        Axios.get('/users/' + res.data.id)
          .then(res => {
            setUserData(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, [userId,trigger]);

  function triggerUpdate(){
    setTrigger(!trigger)
  }

  return (
    <>
      {/* <Header navigation={props.navigation} name="Profile" /> */}
      <ScrollView>
        {/* Profile Header */}
      <View style={{marginTop: 0,position: "absolute",right: 0,left: 0,elevation: 6}}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#1B8BD8',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              borderRadius: 100,
              margin: 20,
              marginLeft: 10,
              width: 55,
              height: 55,
            }}
            source={{
              uri: `https://www.gravatar.com/avatar/${userData.emailHash}?d=retro&s=80`,
            }}
          />
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <Text style={{fontSize: 18, color: 'white'}}>
              {userData.fname + ' ' + (userData.lname ? userData.lname : "")}
            </Text>
            <Text style={{color: 'white'}}>@{userData.username}</Text>
          </View>
        </View>
      </View>

<View style={{marginTop: 90}}>
      {/* Bio */}
      <Card titleStyle={{textAlign: 'left'}} title={
        <View style={{marginBottom: 10,display: "flex",flexDirection: "row"}}>
          <Text style={{fontWeight: "bold"}}>About me</Text>
          <View style={{flexGrow: 1}} />
        <EditBioModal triggerUpdate={triggerUpdate} display={isEditable}/>
        </View>
      }>
        <Text style={{marginBottom: 10}}>
          {userData.bio}
        </Text>
      </Card>
      
      <Card title={
        <View style={{display: "flex",flexDirection: "row"}}>
          <Text></Text>
          <View style={{flexGrow: 1}} />
        <EditLinksModal triggerUpdate={triggerUpdate} display={isEditable}/>
        </View>
      }>
  {
    linkItems.map((item, i) => {
      return (
        <View key={i} style={{display: userData[item.name] ? "flex" : "none",flexDirection: "row",padding: "4%",paddingLeft: 0}}>
          {item.icon}
          <Text>{userData[item.name]}</Text>
        </View>
      );
    })
  }
</Card>

{/* Work */}
<Card title={
        <View style={{display: "flex",flexDirection: "row"}}>
        <MIcon name="work" size={15} style={{marginRight: "2%"}}/>
        <Text>Work</Text>
          <View style={{flexGrow: 1}} />
          <EditWorkModal display={isEditable}/> 
        </View>
      }>
</Card>

{/* Education */}
<Card title={
        <View style={{display: "flex",flexDirection: "row"}}>
        <FIcon name="graduation-cap" size={15} style={{marginRight: "2%"}}/>
        <Text>Education</Text>
          <View style={{flexGrow: 1}} />
    <EditEducationModal display={isEditable}/>
        </View>
      }>

</Card>
</View>
      </ScrollView>
    </>
  );
};

export default Profile;
