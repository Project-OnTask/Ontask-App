import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import Header from '../components/Header';
import PopupMenu from '../components/DotBtnMenu';
import Axios from 'axios';

function TaskItem(props) {
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
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('Task', {
          name: props.name,
          id: props.id,
          groupId: props.groupId,
        })
      }>
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

const Tasks = props => {
  const [assignedTasks, setAssignedTasks] = useState([]);

  useEffect(() => {
    Axios.get('/auth/user/me')
      .then(res => {
        Axios.get('/user/' + res.data.id + '/tasks')
          .then(res => setAssignedTasks(res.data))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

  return (
    <View>
      <Header navigation={props.navigation} name="My Tasks" />
      <View style={{marginTop: 60}}>
        {assignedTasks.length > 0 ? (
          assignedTasks.map(task => <TaskItem 
            name={task.name}
            dueDate={task.dueDate}
            id={task.id}
            navigation={props.navigation} />)
        ) : (
          <Text style={{padding: "5%",color: "gray",textAlign: "center"}}>No assigned tasks</Text>
        )}
      </View>
    </View>
  );
};

export default Tasks;
