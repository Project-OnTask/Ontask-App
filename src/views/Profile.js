import React, {useEffect, useState} from 'react';
import {View, Image, Text, ScrollView} from 'react-native';
import Axios from 'axios';
import FIcon from 'react-native-vector-icons/FontAwesome5'
import ZIcon from 'react-native-vector-icons/Zocial'
import MIcon from 'react-native-vector-icons/MaterialIcons'
import Header from '../components/Header';
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
  const [userId, setUserId] = useState(null);
  const [isBioEditable, setBioEditable] = useState(false);

  useEffect(() => {
    Axios.get('/auth/user/me')
      .then(res => {
        Axios.get('/users/' + res.data.id)
          .then(res => {
            setUserData(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, [userId]);

  function toggleBioEditable(){
    setBioEditable(!isBioEditable)
  }

  return (
    <>
      {/* <Header navigation={props.navigation} name="Profile" /> */}
      <ScrollView>
        {/* Profile Header */}
      <View style={{marginTop: 0}}>
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

      {/* Bio */}
      <Card titleStyle={{textAlign: 'left'}} title={
        <View style={{display: "flex",flexDirection: "row"}}>
          <Text>About me</Text>
          <View style={{flexGrow: 1}} />
          <FIcon name="edit" onPress={toggleBioEditable}/> 
        </View>
      }>
        <Text style={{marginBottom: 10}}>
          {userData.bio}
        </Text>
      </Card>
      <Card>
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
<Card>
    <View style={{display: "flex",flexDirection: "row"}}>
        <MIcon name="work" size={15} style={{marginRight: "2%"}}/>
        <Text>Work</Text>
    </View>
</Card>

{/* Education */}
<Card>
    <View style={{display: "flex",flexDirection: "row"}}>
        <FIcon name="graduation-cap" size={15} style={{marginRight: "2%"}}/>
        <Text>Education</Text>
    </View>
</Card>
      </ScrollView>
    </>
  );
};

export default Profile;
