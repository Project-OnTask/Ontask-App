import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Card, Text} from 'react-native-elements';
import ActivityItem from './components/ActivityItem';
import Header from '../../components/Header';
import Axios from 'axios';

const About = props => {
  const [groupDesc, setGroupDesc] = useState('');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    Axios.get('/groups/' + props.screenProps.groupId + '/desc').then(res => {
      setGroupDesc(res.data);
    });

    Axios.get('/groups/' + props.screenProps.groupId + '/activity').then(
      res => {
        setActivities(res.data);
        console.log('activities: ', res.data);
      },
    );

  }, [props.screenProps.groupId]);

  return (
    <View>
      <Header
        navigation={props.screenProps.navigation}
        name={props.screenProps.groupData && props.screenProps.groupData.name}
      />
      <ScrollView style={{marginTop: 55}}>
        <Card
          title="About"
          titleStyle={{
            textAlign: 'left',
          }}>
          <Text style={{marginBottom: 10}}>{groupDesc}</Text>
        </Card>

        <View style={{marginTop: 10,marginLeft: "5%"}}>
        <Text h5 style={{fontWeight: "bold",color: "gray"}}>
          Activity
        </Text>
        {activities.reverse().map( (item,index) => 
          <ActivityItem 
          key={index}
          activity={item.description.split('group')[0]+" group"}
          createdAt={item.createdAt}
        />
        )}      
  
      </View>
      </ScrollView>
    </View>
  );
};

export default About;
