import React, {useState} from 'react';
import {
  Modal,
  TouchableHighlight,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Text, Input, Button, CheckBox} from 'react-native-elements';
import Axios from 'axios';

const styles = StyleSheet.create({
  addIcon: {paddingRight: '3%'},
  closeIcon: {
    textAlign: 'right',
    padding: '2%',
    marginTop: '2%',
  },
  dateLabel: {marginLeft: '3%', marginTop: '2%'},
});

const NewWorkForm = () => {
  const [workPlace, setWorkPlace] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [isWorking, setIsWorking] = useState(false);
  const [isSubmitting, setSubmitStatus] = useState(false);

  function AddNewWork() {
    setSubmitStatus(true);
    if (isWorking && finishDate) {
      setFinishDate('');
      Axios.get('/auth/user/me')
        .then(res => {
          Axios.post('/user/work', {
            userId: res.data.id, 
            title: title,
            w_place: workPlace,
            from: startDate,
            to: finishDate,
            description: description,
            isWorking: isWorking,
          })
            .then(res => Alert.alert('Success'))
            .catch(err => Alert.alert('Error'));
        })
        .catch(err => {
          console.log(err);
          setSubmitStatus(false);
          Alert.alert('An error occured');
        });
    }
  }

  return (
    <ScrollView>
      <Text h4 style={{marginLeft: '2%', marginBottom: '2%'}}>
        Add new workplace
      </Text>
      <Input
        label="Workplace"
        inputContainerStyle={{
          marginTop: 10,
          borderWidth: 1,
          height: 40,
          borderRadius: 10,
          borderBottomColor: 'black',
          borderColor: 'black',
        }}
        onChangeText={text => setWorkPlace(text)}
      />

      <Input
        label="Title/Position"
        inputContainerStyle={{
          marginTop: 10,
          borderWidth: 1,
          height: 40,
          borderRadius: 10,
          borderBottomColor: 'black',
          borderColor: 'black',
        }}
        onChangeText={text => setTitle(text)}
      />
      <View>
        <Input
          placeholder=""
          multiline
          label="Description"
          inputContainerStyle={{
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 10,
            borderBottomColor: 'black',
            borderColor: 'black',
          }}
          onChangeText={text => setDescription(text)}
          numberOfLines={5}
          textAlignVertical="top"
          blurOnSubmit={true}
        />

        <Text style={styles.dateLabel}>Start date</Text>
        <DatePicker
          style={{width: '105%', marginLeft: '-8%', marginTop: '2%'}}
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
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => setStartDate(date)}
        />

        <Text style={styles.dateLabel}>Due date</Text>
        <DatePicker
          style={{width: '105%', marginLeft: '-8%', marginTop: '2%'}}
          date={finishDate}
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
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={date => setFinishDate(date)}
        />

        <CheckBox
          title="Currently working here"
          checked={isWorking}
          onPress={() => setIsWorking(!isWorking)}
        />
        <Button
          title="Add"
          disabled={isSubmitting}
          titleStyle={{marginBottom: '5%'}}
          buttonStyle={{margin: '3%'}}
          onPress={AddNewWork}></Button>
      </View>
    </ScrollView>
  );
};

export default NewWorkForm;
