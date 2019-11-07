import React, {useState} from 'react';
import {
  Modal,
  TouchableHighlight,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import EIcon from 'react-native-vector-icons/Entypo';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import {Input, Text, Button} from 'react-native-elements';
import Axios from 'axios';

export default function EditBioModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [bio, setBio] = useState('');
  const [isSubmitting,setSubmitStatus] = useState(false)

  function updateBio() {
    if(bio === ""){
      Alert.alert("Bio is empty")
    }
    else{
      setSubmitStatus(true)
      Axios.get('/auth/user/me')
      .then(res => {
        Axios.post('/users/' + res.data.id + '/bio', null,{
          params: {
            bio: bio,
          },
        })
          .then(res => {
            if(res.status === 200){
              setSubmitStatus(false)
              props.triggerUpdate()
              setModalVisible(false)
              Alert.alert('Success')
            }
          })
          .catch(err => {
            setSubmitStatus(false)
            Alert.alert('Error')
          });
      })
      .catch(err => {
        setSubmitStatus(false)
        Alert.alert('Error')
      });
    }
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
          }}
        />
        <ScrollView style={{marginLeft: '2%', marginRight: '2%'}}>
          <Text h4 style={{marginBottom: '2%'}}>
            Edit bio
          </Text>
          <Input
            placeholder="Tell about yourself"
            multiline
            onChangeText={text => setBio(text)}
            numberOfLines={8}
            textAlignVertical="top"
            blurOnSubmit={true}
            containerStyle={{borderWidth: 1, borderColor: 'black'}}
            inputContainerStyle={{borderBottomWidth: 0}}
          />
          <View style={{paddingTop: '3%'}}>
            <Button title="Save" onPress={updateBio} disabled={isSubmitting} />
          </View>
        </ScrollView>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}>
                      {props.display ?         <FIcon name="edit" size={12} style={styles.addIcon} /> : <></>}
        
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  addIcon: {paddingRight: '3%'},
  closeIcon: {
    textAlign: 'right',
    padding: '2%',
    marginTop: '2%',
  },
});
