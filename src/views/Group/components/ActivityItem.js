import React from 'react';
import {View, Image} from 'react-native';
import moment from 'moment';
import HTML from 'react-native-render-html'
import {Text} from 'react-native-elements';

const ActivityItem = props => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2%',
        paddingLeft: 0
      }}>
      <View style={{marginLeft: "1%"}}>
        <HTML html={props.activity} />
      </View>
      <Text h5> {moment(new Date(props.createdAt)).fromNow()}</Text>
    </View>
  );
};

export default ActivityItem;
