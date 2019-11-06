import React, {useState} from 'react';
import {Modal, TouchableHighlight, StyleSheet, View,ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import NewNoticeForm from '../../../forms/NewNoticeForm';
import EIcon from 'react-native-vector-icons/Entypo'

export default function NewNoticeModal(props){
  
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
                  setModalVisible(false);
                }}/>
                 <ScrollView>
                 <NewNoticeForm 
                   groupId={props.groupId}
                    onFormSubmit={() => {
                      props.updateNotices()  
                      setModalVisible(false)
                    }}
                    groupId={props.groupId}
                />
                 </ScrollView>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
          }}
          underlayColor="none">
                        <Icon name="addfile" size={20} style={styles.addIcon} />
        </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    addIcon: {paddingRight: '3%',paddingTop: "1.5%"},
    closeIcon: {
        textAlign: "right",
        padding: "1%",
        marginTop: "2%"
    }
})