import React, {useState} from 'react';
import {Modal, TouchableHighlight, StyleSheet, View,ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo'
import SearchUsersForm from '../../../forms/SearchUsersForm'
import {SearchBar} from 'react-native-elements'

export default function NewTaskModal(props){
  
  const [modalVisible,setModalVisible] = useState(false)
  const [query,setQuery] = useState("")

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <EIcon name="cross" size={25} style={styles.closeIcon} onPress={() => {
                  setModalVisible(false);
                  props.trigger()
                }}/>
                 <ScrollView>
                    <SearchUsersForm groupId={props.groupId}/>
                 </ScrollView>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
          }}>
            <Icon name="adduser" style={styles.addIcon} size={25} />
                        
        </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    addIcon: {paddingTop: "4%",paddingRight: "10%"},
    closeIcon: {
        textAlign: "right",
        padding: "2%",
        marginTop: "4%"
    }
})