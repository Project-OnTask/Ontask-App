import React, {Component} from 'react';
import {Modal, StyleSheet, View, Alert} from 'react-native';
import Axios from 'axios';
import {Text, Card} from 'react-native-elements';
import EIcon from 'react-native-vector-icons/Entypo';

class NoticeViewer extends Component {
  state = {
    title: '',
    content: '',
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    if (this.props.i && this.props.selectedNoticeId) {
      this.setModalVisible(true);
      Axios.get('/notices/' + this.props.selectedNoticeId)
        .then(res =>
          this.setState({title: res.data.title, content: res.data.content}),
        )
        .catch(err => console.log(err));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.i !== prevProps.i) {
      this.setModalVisible(true);
      Axios.get('/notices/' + this.props.selectedNoticeId)
      .then(res =>
        this.setState({title: res.data.title, content: res.data.content}),
      )
      .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 0,marginLeft: "5%"}}>
            <EIcon
              name="cross"
              size={25}
              style={styles.closeIcon}
              onPress={() => {
                this.setModalVisible(false);
              }}
            />
            <Text h4>{this.state.title}</Text>

            <Text style={styles.content}>{this.state.content}</Text>

</View>
        
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {paddingTop: '6%'},
  closeIcon: {
    textAlign: 'right',
    padding: '2%',
    paddingBottom: 0,
    marginTop: '2%',
  },
});

export default NoticeViewer;
