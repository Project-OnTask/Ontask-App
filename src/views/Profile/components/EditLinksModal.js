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
import {Text, Input, Button} from 'react-native-elements';
import Axios from 'axios';

export default function EditLinksModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmitting,setSubmitStatus] = useState(false)
  const [mobile, setMobile] = useState('');
  const [website, setWebsite] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [stackoverflow, setStackoverflow] = useState('');

  function updateWebPresence(){
    if(!mobile && !website && !linkedin && !github && !stackoverflow){
        Alert.alert("Web presence is empty")
    }
    else{
        setSubmitStatus(true)
        Axios.get('/auth/user/me').then(res => {
            Axios.post('/user/'+res.data.id+'/web-presence',{
                websiteLink: website,
                stackOverflow: stackoverflow,
                githubLink: github,
                linkedInLink: linkedin
            }).then(res => {
                if(res.status === 200){
                    setSubmitStatus(false)
                    props.triggerUpdate()
                    setModalVisible(false)
                    Alert.alert("Success")
                }
            }).catch(err => {
                setSubmitStatus(false)
                Alert.alert("Error")
            })
        }).catch(err => {
            setSubmitStatus(false)
            Alert.alert("Error")
        })
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
        <ScrollView>
          <Text h4 style={{marginLeft: '2%', marginBottom: '2%'}}>
            Edit web presence
          </Text>
          <Input
            label="Mobile no."
            onChangeText={text => setMobile(text)}
            inputContainerStyle={{marginBottom: '2%'}}
          />
          <Input
            label="Personal Website"
            onChangeText={text => setWebsite(text)}
            inputContainerStyle={{marginBottom: '2%'}}
          />
          <Input
            label="Linkedin URL"
            onChangeText={text => setLinkedin(text)}
            inputContainerStyle={{marginBottom: '2%'}}
          />
          <Input
            label="Github URL"
            onChangeText={text => setGithub(text)}
            inputContainerStyle={{marginBottom: '2%'}}
          />
          <Input
            label="StackOverflow URL"
            onChangeText={text => setStackoverflow(text)}
            inputContainerStyle={{marginBottom: '2%'}}
          />
          <Button
            title="Save"
            disabled={isSubmitting}
            onPress={updateWebPresence}
            buttonStyle={{
              marginLeft: '2%',
              marginBottom: '3%',
              marginRight: '2%',
            }}></Button>
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
