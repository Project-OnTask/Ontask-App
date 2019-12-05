import React from 'react';
import {View,Image} from 'react-native'
import { Text} from 'react-native-elements'
import PopupMenu from '../../../components/DotBtnMenu'

const MemberItem = props => {
    return (
        <View style={{display: "flex",flexDirection: "row",padding: "2%",height: 40,alignItems: "center"}}>
             <Image
          style={{width: 35, height: 35,borderRadius: 100,marginRight: "2%"}}
          source={{uri: `https://www.gravatar.com/avatar/${props.emailHash}?d=retro&s=80`}}
        />
            <View>
            <Text h5 onPress={() => props.navigation.navigate("Profile",{
                id: props.id
})}>{props.name}</Text>
            </View>
            <View style={{flexGrow: 1}} />
            <PopupMenu 
        actions={['Revoke access']} 
        onPress={(event,index) => {}}
         />
        </View>
    );
};

export default MemberItem;