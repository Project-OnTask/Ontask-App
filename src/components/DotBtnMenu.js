import React, { Component } from 'react';
import { View, UIManager, findNodeHandle, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

class DotBtnMenu extends Component {
    constructor (props) {
        super(props)
        this.state = {
          icon: null
        }
      }
    
      onError () {
        console.log('Popup Error')
      }
    
      onPress = () => {
        if (this.state.icon) {
          UIManager.showPopupMenu(
            findNodeHandle(this.state.icon),
            this.props.actions,
            this.onError,
            this.props.onPress
          )
        }
      }

    render() {
        return (
            <View>
            <TouchableOpacity onPress={this.onPress}>
              <Icon
                name='more-vert'
                size={25}
                color={this.props.color ? this.props.color : 'grey'}
                ref={this.onRef} />
            </TouchableOpacity>
          </View>
    
        );
    }

    onRef = icon => {
        if (!this.state.icon) {
          this.setState({icon})
        }
      }
}

export default DotBtnMenu;