import React, {useState} from 'react';
import {Modal, TouchableHighlight, StyleSheet, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import EIcon from 'react-native-vector-icons/Entypo'
import NewGroupForm from '../../../forms/NewGroupForm';
import {Text} from 'react-native-elements'

export default function NewGroupModal(props){
  
  const [modalVisible,setModalVisible] = useState(false)

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
                  setModalVisible(!modalVisible);
                }}/>
                <View >

                <NewGroupForm 
                    onFormSubmit={() => {
                        setModalVisible(false)
                        props.triggerUpdate()
                        props.navigation.navigate('Groups')
                    }}
                />
                </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
          }}>
                        <Icon name="addusergroup" size={25} style={styles.addIcon} />
        </TouchableHighlight>
      </View>
    );
}

const styles = StyleSheet.create({
    addIcon: {paddingRight: '3%'},
    closeIcon: {
        textAlign: "right",
        padding: "2%"
    }
})