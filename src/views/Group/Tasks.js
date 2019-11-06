import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import Header from '../../components/Header';
import PopupMenu from '../../components/DotBtnMenu';
import AddTaskModal from './components/AddTaskModal';
import Axios from 'axios';

function TaskItem(props) {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Task',{
      name: props.name,
      id: props.id,
      groupId: props.groupId
    })}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          elevation: 5,
          alignItems: 'center',
          height: 50,
        }}>
        <View style={{padding: '3%'}}>
          <Text h5 style={{fontSize: 15}}>
            {props.name}
          </Text>
          <Text>due {props.dueDate}</Text>
        </View>
        <View style={{flexGrow: 1}}></View>
        <PopupMenu actions={['Revoke access']} onPress={(event, index) => {}} />
      </View>
    </TouchableOpacity>
  );
}

const GroupTasks = props => {
  const [groupTasks, setGroupTasks] = useState([]);
  const [trigger,setTrigger] = useState(false)

  useEffect(() => {
    Axios.get(props.screenProps.groupId + '/tasks')
      .then(res => {
        console.log('tasks: ', res.data);
        setGroupTasks(res.data);
      })
      .catch(err => console.log(err));
  }, [props.screenProps.groupId,trigger]);

  return (
    <View>
      <Header
        navigation={props.screenProps.navigation}
        name={props.screenProps.groupData && props.screenProps.groupData.name}
      />
      <View style={{marginTop: 50}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: 50,
            alignItems: 'center',
          }}>
          <Text h4 style={{paddingLeft: '3%'}}>
            Tasks
          </Text>
          <View style={{flexGrow: 1}}></View>
          <AddTaskModal groupId={props.screenProps.groupId} updateTasks={() => setTrigger(!trigger)}/>
        </View>
        { groupTasks.length > 0 ?groupTasks.map((task,index) => (
          <TaskItem
            key={index}
            navigation={props.screenProps.navigation}
            groupId={props.screenProps.groupId}
            name={task.name}
            id={task.id}
            dueDate={task.dueDate}
            completed={task.completed}
          />
        )) : <Text style={{textAlign: "center",color: "gray"}}>No Tasks</Text>}
      </View>
    </View>
  );
};

export default GroupTasks;
