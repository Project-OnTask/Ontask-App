import React from 'react';
import moment from 'moment';
import {View,Image} from 'react-native'
import { Text} from 'react-native-elements'

const CommentItem = props => {
    return (
        <View style={{display: "flex",flexDirection: "row",paddingLeft: 0,padding: "1%"}}>
             <Image
          style={{width: 30, height: 30,borderRadius: 100,margin: "2%",marginLeft: 0}}
          source={{uri: `https://www.gravatar.com/avatar/${props.emailHash}?d=retro&s=10`}}
        />
            <View>
            <Text h5 style={{fontSize: 18}}>{props.fname} &#183; <Text style={{fontSize: 13}}>{moment(new Date(props.createdAt)).fromNow()}</Text></Text>
            <Text>{props.content}</Text>
            </View>
        </View>
    );
};

export default CommentItem;