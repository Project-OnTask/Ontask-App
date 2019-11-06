import React, {useState, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {Input, Button, Card, Text} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const NewTaskForm = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting,setSubmitStatus] = useState(false);
  const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
  const [dueDate, setDueDate] = useState(new Date().toJSON().slice(0, 10));
  const [error, setError] = useState('');

  async function createTask() {
    setSubmitStatus(true)
    
    Axios.get('/auth/user/me').then(res => {
      Axios.post('/tasks', {
        createdBy: res.data.id,
        name: name,
        description: description,
        startDate: new Date(startDate).toJSON().slice(0,10),
        dueDate: new Date(dueDate).toJSON().slice(0,10),
        groupId: props.groupId,
      })
        .then(res => {
          if (res.status === 200) {
            Alert.alert('New Task created');
            setSubmitStatus(false)
            props.onFormSubmit();
          }
        })
        .catch(err => {
          console.log(err)
          setError('An error occured. Please try again')
          setSubmitStatus(false)
        });
    }).catch(err => {
      console.log(err)
      setSubmitStatus(false)
      setError("An error occured. Please try again")
    })
    
  }

  return (
    <Card
      title="Create task"
      titleStyle={{
        textAlign: 'left',
        fontSize: 20,
        marginLeft: "3%",
        padding: 0
      }}
      containerStyle={{
        margin: 0,
        padding: 0
      }}>
        {error ? <Text
        style={{
          textAlign: 'center',
          color: 'red',
          padding: "2%",
          paddingTop: "1%"
        }}>
        {error}
      </Text> : <></>}
      <Input
        placeholder="Name"
        containerStyle={{marginBottom: '5%'}}
        onChangeText={name => setName(name)}
      />

      <Input
        placeholder="Description"
        multiline={true}
        numberOfLines={2}
        blurOnSubmit={true}
        containerStyle={{paddingBottom: '3%'}}
        onChangeText={description => setDescription(description)}
      />

        <Text h5 style={{fontSize: 18,marginLeft: "3%",color: "gray"}}>
          Start date
        </Text>
        <DatePicker
          date={startDate}
          onDateChange={date => setStartDate(date)}
          minimumDate={new Date().toJSON().slice(0, 10)}
        />


        <Text h5 style={{fontSize: 18,marginLeft: "3%",color: "gray"}}>
          Due date
        </Text>
        <DatePicker
          date={dueDate}
          onDateChange={date => setDueDate(date)}
          minimumDate={startDate}
        />


      <Button
        title="Create task"
        disabled={isSubmitting}
        onPress={createTask}
        buttonStyle={{margin: 10}}
      />
    </Card>
  );
};

export default NewTaskForm;
