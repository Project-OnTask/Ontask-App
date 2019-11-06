import React from 'react';
import {View,Image} from 'react-native'
import { Text} from 'react-native-elements'
import moment from 'moment';
import PopupMenu from '../../../components/DotBtnMenu'

const ResourceItem = () => {
    return (
        <View style={{display: "flex",flexDirection: "row",height: 25,alignItems: "center"}}>
             <Image
          style={{width: 25, height: 25,borderRadius: 10,marginRight: "2%"}}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />
            <View>
            <Text h5 style={{fontWeight: "bold"}}>{props.name}</Text>
            <Text>{moment(new Date(props.createdAt)).fromNow()}</Text>
            </View>
            <View style={{flexGrow: 1}} />
            <PopupMenu 
        actions={['Revoke access']} 
        onPress={(event,index) => {}}
         />
        </View>
    );
};

export default ResourceItem;