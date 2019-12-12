import React, {useState} from 'react';
import {
  Modal,
  TouchableHighlight,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios'
import { Input,Button } from 'react-native-elements'
import FIcon from 'react-native-vector-icons/Feather';
import EIcon from 'react-native-vector-icons/Entypo';
import SearchMembersForm from '../../../forms/SearchMembersForm';
import FOIcon from 'react-native-vector-icons/FontAwesome5';

export default function EditAboutModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [about, setAbout] = useState('');

  function updateAbout(){
      axios.get("/auth/user/me").then(
          res => {
            axios.post("/tasks/edit-desc",{
                editedBy: res.data.id,
                taskId: props.taskId,
                description: about
            }).then(
                res => {
                    Alert.alert("Success")
                    props.trigger()
                }
            ).catch(
                err => {
                    Alert.alert("Error")
                    console.log(err)
                }
            )
          }
      ).catch(err => console.log(err))
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <EIcon
          name="cross"
          size={25}
          style={styles.closeIcon}
          onPress={() => {
            setModalVisible(false);
            props.trigger();
          }}
        />
        <ScrollView>
        <Input 
        label="Group Description"
        numberOfLines={6}
        textAlignVertical="top"
        blurOnSubmit={true}
        multiline={true}
        inputContainerStyle={{
          marginTop: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderBottomColor: "black",
          borderColor: "black"
        }}
        onChangeText={text => setAbout(text)}
      />
      <Button value="Update" onPress={updateAbout}></Button>
        </ScrollView>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}>
                        <FOIcon name="edit" size={16} style={{paddingTop: '2%'}} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  addIcon: {paddingTop: '4%', paddingRight: '10%'},
  closeIcon: {
    textAlign: 'right',
    padding: '2%',
    marginTop: '4%',
  },
});
