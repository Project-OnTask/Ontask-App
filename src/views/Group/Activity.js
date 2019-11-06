import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import Header from '../../components/Header';
import ActivityItem from './components/ActivityItem';
import Axios from 'axios';

const Activity = props => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
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
      <View style={{marginTop: 55}}>
        <Text h4 style={{paddingLeft: '3%'}}>
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
    </View>
  );
};

export default Activity;
