import React from 'react';
import {View,Image} from 'react-native'
import { Text} from 'react-native-elements'

const ActivityItem = () => {
    return (
        <View style={{display: "flex",flexDirection: "row",padding: "1%"}}>
             <Image
          style={{width: 25, height: 25,borderRadius: 10,margin: "2%",marginLeft: 0}}
          source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}}
        />
            <View>
            <Text h5 style={{fontWeight: "bold"}}>Activity Text</Text>
            </View>
        </View>
    );
};

export default ActivityItem;