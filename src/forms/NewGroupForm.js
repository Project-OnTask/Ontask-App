import React, {useState} from 'react';
import {Input, Button, Text} from 'react-native-elements';
import {View, Alert, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const NewGroupForm = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setSubmitStatus] = useState(false);

  function showError() {
    Alert.alert('Required fields are missing');
  }

  async function createGroup() {
    if (
      name.length === 0 ||
      name === undefined ||
      description.length === 0 ||
      description === undefined
    ) {
      showError();
    } else {
      setSubmitStatus(true);
      axios.get('/auth/user/me').then(res => {
        axios
        .post('/groups', {
          userId: res.data.id,
          name: name,
          description: description,
        })
        .then(res => {
          if (res.status === 200) {
            Alert.alert('New Group Created');
            setSubmitStatus(false);
            props.onFormSubmit();
          }
        })
        .catch(err => {
          setSubmitStatus(false);
          console.log(err);
        });
      }).catch(err => console.log(err))
    }
  }

  return (
    <>
      <Text h4 style={{paddingLeft: '2%',marginBottom: "2%"}}>
        Create group
      </Text>
      <View>
        <Input placeholder="Name" onChangeText={name => setName(name)} />

        <Input
        inputContainerStyle={{marginTop: "1%"}}
          placeholder="Description"
          multiline={true}
          textAlignVertical="top"
          numberOfLines={6}
          blurOnSubmit={true}
          onChangeText={desc => setDescription(desc)}
        />

        <View style={styles.btnContainer}>
          <Button
            title="Create group"
            onPress={createGroup}
            buttonStyle={styles.btn}
            disabled={isSubmitting}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {},
  btnContainer: {
    marginTop: '2%',
    marginLeft: '5%',
    marginRight: '5%',
  },
});

export default NewGroupForm;
