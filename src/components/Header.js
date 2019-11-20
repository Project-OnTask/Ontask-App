import React from 'react';
import { Header,Text } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { DrawerActions } from 'react-navigation-drawer';

const Menu = (props) => {
    return(
        <Icon
  name='menu' 
  color="white"
  size={35}
  onPress={ () => {
    props.navigation.dispatch(DrawerActions.openDrawer());
}}/>
        
    )
}

const ActionBar = props => {
    return (
        <Header
        placement="left"
        leftComponent={<Menu navigation={props.navigation}/>}
        centerComponent={{ text: props.name, style: { fontSize: 20,color: '#fff' } }}
        rightComponent={{ icon: 'search', color: '#fff' }}
        containerStyle={{
            paddingTop: 0,
            marginTop: 0,
            height: 50,
            backgroundColor: "#09C442",
            position: "absolute",
            top: 0,
            zIndex: 250000,
            right: 0,
            left: 0
        }}
      />
    );
};

export default ActionBar;