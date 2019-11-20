import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import Axios from 'axios';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10
  },
  dateLabel: {
    marginLeft: "2%",
    color: "gray",
    marginTop: "2%",
    fontSize: 16,
    fontWeight: "bold"
  }
}
)

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
        groupId: props.groupId
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
    <>
      <Text h4 style={{marginLeft: "3%"}}>Create task</Text>
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
        label="Name"
        inputContainerStyle={styles.input}
        containerStyle={{marginTop: '2%'}}
        onChangeText={name => setName(name)}
      />

      <Input
        label="Description"
        multiline={true}
        inputContainerStyle={styles.input}
        numberOfLines={5}
        textAlignVertical="top"
        blurOnSubmit={true}
        containerStyle={{paddingTop: '2%'}}
        onChangeText={description => setDescription(description)}
      />

<Text style={styles.dateLabel}>Start date</Text>
<DatePicker
        style={{width: "105%",marginLeft: "-8%",marginTop: "2%"}}
        date={startDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => setStartDate(date)}
      />

<Text style={styles.dateLabel}>Due date</Text>
<DatePicker
        style={{width: "105%",marginLeft: "-8%",marginTop: "2%"}}
        date={dueDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={startDate}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={date => setDueDate(date)}
      />

      <Button
        title="Create task"
        disabled={isSubmitting}
        onPress={createTask}
        buttonStyle={{margin: 10}}
      />
    </>
  );
};

export default NewTaskForm;
