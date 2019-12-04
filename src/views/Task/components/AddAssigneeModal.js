import React, {useState} from 'react';
import {
  Modal,
  TouchableHighlight,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import EIcon from 'react-native-vector-icons/Entypo';
import SearchMembersForm from '../../../forms/SearchMembersForm';

export default function AddAssigneeModal(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [query, setQuery] = useState('');

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
           <SearchMembersForm groupId={props.groupId} taskId={props.taskId}/> 
        </ScrollView>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}>
        <FIcon name="plus" size={25} style={{color: 'gray'}} />
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
