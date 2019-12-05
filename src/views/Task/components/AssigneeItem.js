import React from 'react';
import {View,Image} from 'react-native'
import { Text} from 'react-native-elements'
import PopupMenu from '../../../components/DotBtnMenu'

const AssigneeItem = props => {
    return (
        <View style={{display: "flex",flexDirection: "row",height: 35,marginBottom: "2%",alignItems: "center"}}>
             <Image
          style={{width: 30, height: 30,borderRadius: 100,marginRight: "2%"}}
          source={{uri: `https://www.gravatar.com/avatar/${props.emailHash}?d=retro&s=10`}}
        />
            <View>
            <Text h5 style={{fontWeight: "bold"}}>{props.fname}</Text>
            </View>
            <View style={{flexGrow: 1}} />
            <PopupMenu 
        actions={['Revoke access']} 
        onPress={(event,index) => {}}
         />
        </View>
    );
};

export default AssigneeItem;