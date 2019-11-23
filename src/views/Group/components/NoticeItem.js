import React from 'react';
import {View,Image, TouchableOpacity} from 'react-native'
import { Text} from 'react-native-elements'
import moment from 'moment';
import PopupMenu from '../../../components/DotBtnMenu'

const NoticeItem = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{display: "flex",flexDirection: "row",padding: "4%",paddingLeft: "1%",marginLeft: "1%",height: 40,alignItems: "center"}}>
           <View>
            <Text h5 style={{fontSize: 18}}>{props.title}</Text>
            <Text style={{color: "gray"}}>{moment(new Date(props.createdAt)).fromNow()}</Text>
            </View>
            <View style={{flexGrow: 1}} />
            <PopupMenu 
        actions={['Delete']} 
        onPress={(event,index) => {}}
         />
        </View>
        </TouchableOpacity>
    );
};

export default NoticeItem;