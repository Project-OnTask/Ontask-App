import React, {useState} from 'react';
import {Input, Button, Text} from 'react-native-elements';
import {View, Alert, StyleSheet} from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const NewGroupForm = props => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setSubmitStatus] = useState(false);

  function showError() {
    Alert.alert('Required fields are missing');
  }

  async function createGroup() {
    if (
      name.length === 0 || name === undefined || // If name field is empty
      description.length === 0 || description === undefined //If description field is empty
    ) {
      showError();
    } else {
      setSubmitStatus(true);
      axios
        .get('/auth/user/me')
        .then(res => {
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
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <ScrollView>
      <Text h4 style={styles.title}>
        Create new group
      </Text>
      <View>
        <Input
          label="Name"
          inputContainerStyle={styles.nameField}
          onChangeText={name => setName(name)}
        />

        <Input
          containerStyle={{marginTop: '4%'}}
          label="Description"
          multiline={true}
          textAlignVertical="top"
          numberOfLines={6}
          blurOnSubmit={true}
          inputContainerStyle={styles.descriptionField}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingLeft: '3%', 
    marginBottom: '3%', 
    marginBottom: '5%'
  },
  nameField: {
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    borderBottomColor: 'black',
    borderColor: 'black',
  },
  descriptionField: {
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    borderBottomColor: 'black',
    borderColor: 'black',
  },
  btnContainer: {
    marginTop: '4%',
    marginLeft: '3%',
    marginRight: '3%',
    borderRadius: 10,
  },
});

export default NewGroupForm;
