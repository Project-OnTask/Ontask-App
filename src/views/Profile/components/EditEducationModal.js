import React, {useState} from 'react';
import {
  Modal,
  TouchableHighlight,
  StyleSheet,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import NewEducationForm from '../../../forms/NewEducationForm'
import EIcon from 'react-native-vector-icons/Entypo';

import {Text, Input, Button} from 'react-native-elements';
import FIcon from 'react-native-vector-icons/FontAwesome5';

export default function EditEducationModal(props) {
  const [modalVisible, setModalVisible] = useState(false);

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
        <NewEducationForm />
      </Modal>

      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
        }}>
        {props.display ? (
          <FIcon name="edit" size={12} style={styles.addIcon} />
        ) : (
          <></>
        )}
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
