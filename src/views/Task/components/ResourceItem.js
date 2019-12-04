import React from 'react';
import {View,Image} from 'react-native'
import { Text} from 'react-native-elements'
import moment from 'moment';
import PopupMenu from '../../../components/DotBtnMenu'

const ResourceItem = props => {
    return (
        <View style={{display: "flex",flexDirection: "row",height: 55,alignItems: "center"}}>
            <View>
            <Text h5 style={{fontWeight: "bold"}}>{props.name}</Text>
            <Text>{moment(new Date(props.createdAt)).fromNow()}</Text>
            </View>
            <View style={{flexGrow: 1}} />
            <PopupMenu 
        actions={['Delete']} 
        onPress={(event,index) => {}}
         />
        </View>
    );
};

export default ResourceItem;