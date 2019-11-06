import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import Header from '../../components/Header';
import AddNoticeModal from './components/AddNoticeModal';
import NoticeViewer from './components/NoticeViewer'
import NoticeItem from './components/NoticeItem';
import Axios from 'axios';

const Notices = props => {
  const [i,setI] = useState(0)
  const [notices, setNotices] = useState([]);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    Axios.get('/notices/group/' + props.screenProps.groupId)
      .then(res => {
        console.log("notices: ",res.data)
        setNotices(res.data)
      })
      .catch(err => console.log(err));
  }, [trigger, props.screenProps.groupId]);

  return (
    <View>
      <Header
        navigation={props.screenProps.navigation}
        name={props.screenProps.groupData && props.screenProps.groupData.name}
      />
      <View
        style={{marginTop: 55, paddingdisplay: 'flex', flexDirection: 'row'}}>
        <Text h4 style={{paddingLeft: '2%'}}>
          Announcements
        </Text>
        <View style={{flexGrow: 1}} />
        <AddNoticeModal
          groupId={props.screenProps.groupId}
          updateNotices={() => setTrigger(!trigger)}
        />
      </View>
      <View>
        {notices.map(notice => (
          <NoticeItem key={notice.id} 
          onPress={() => {
            setSelectedNoticeId(notice.id)
            setI(i+1)
          }}
          title={notice.title} createdAt={notice.date} />
        ))}
      </View>
      <NoticeViewer 
        selectedNoticeId={selectedNoticeId}
        i={i}
      />
    </View>
  );
};

export default Notices;
