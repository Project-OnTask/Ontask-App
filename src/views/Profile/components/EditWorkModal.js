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
import NewWorkForm from '../../../forms/NewWorkForm';

export default function EditWorkModal(props) {
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
    <NewWorkForm />
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
    marginTop: '0%',
  },
});
