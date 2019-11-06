import React, {Component} from 'react';
import {View, Image, Alert} from 'react-native';
import axios from 'axios';
import {Text, Button} from 'react-native-elements';

export default class MemberSearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitting: false,
    };
  }

  addToGroup = () => {
    this.setState({isSubmitting: true});
    axios.get('/auth/user/me').then(res => {
    axios.post('/members', {
        userId: this.props.userId,
        groupId: this.props.groupId,
      },{
          params: {
            addedBy: res.data.id
          }
      })
      .then(res => {
          Alert.alert("Success")
        this.props.onAdd()
      })
      .catch(err => {
          Alert.alert("An error occured.")
          this.setState({isSubmitting: false})
        });

    }).catch(err => console.log(err))
  };

  render() {
    return (
      <View
        style={{
          elevation: 6,
          padding: '2%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            borderRadius: 100,
            margin: 10,
            marginLeft: 0,
            width: 40,
            height: 40,
          }}
          source={{
            uri: `https://www.gravatar.com/avatar/${this.props.emailHash}?d=retro&s=10`,
          }}
        />
        <Text h5>{this.props.name}</Text>
        <View style={{flexGrow: 1}} />
        <Button
          success
          disabled={this.state.isSubmitting}
          onPress={this.addToGroup}
          title="Add"
          style={{marginTop: '7%', marginBottom: '-7%'}}></Button>
      </View>
    );
  }
}
