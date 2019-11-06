import React from 'react';
import {View,Image} from 'react-native'
import { Text} from 'react-native-elements'

const CommentItem = () => {
    return (
        <View style={{display: "flex",flexDirection: "row",padding: "1%"}}>
             <Image
          style={{width: 25, height: 25,borderRadius: 10,margin: "2%",marginLeft: 0}}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />
            <View>
            <Text h5 style={{fontWeight: "bold"}}>Dinalie</Text>
            <Text>
            The idea with React Native Elements is more about component structure than actual design.
            </Text>
            </View>
        </View>
    );
};

export default CommentItem;