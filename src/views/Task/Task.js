import React, {useEffect, useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {Text, Input} from 'react-native-elements';
import PopupMenu from '../../components/DotBtnMenu';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FOIcon from 'react-native-vector-icons/FontAwesome5';
import CommentItem from './components/CommentItem';
import AssigneeItem from './components/AssigneeItem';
import ActivityItem from './components/ActivityItem';
import FIcon from 'react-native-vector-icons/Feather';
import PusherObject from '../../utils/PusherObject';
import ResourceItem from './components/ResourceItem';
import Axios from 'axios';
import EditAboutModal from './components/EditAboutModal'
import AddAssigneeModal from './components/AddAssigneeModal';
import DocumentPicker from 'react-native-document-picker';


const Task = props => {
  const [taskData, setTaskData] = useState([]);
  const [input, setInput] = useState('');
  const [trig, setTrig] = useState(false);
  const [taskResources, setTaskResources] = useState([]);
  const [comments, setComments] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const chatChannel = PusherObject.subscribe(
      'chat_' + props.navigation.getParam('id'),
    );

    chatChannel.bind('new_comment', data => updateComments(JSON.parse(data)));

    props.navigation.setParams({
      headerTitle: props.navigation.getParam('name'),
      taskId: props.navigation.getParam('id'),
    });

    Axios.get('/tasks/' + props.navigation.getParam('id'))
      .then(res => {
        console.log('task: ', res.data);
        setTaskData(res.data);
      })
      .catch(err => console.log(err));

    Axios.get('/task_resources/' + props.navigation.getParam('id')).then(res =>{
      setTaskResources(res.data)
      console.log("res: ",res.data)
    }
    );

    Axios.get('/comments/' + props.navigation.getParam('id')).then(res =>
      setComments(res.data),
    );

    Axios.get('/task-asignee/' + props.navigation.getParam('id')).then(res =>
      setAssignees(res.data),
    );
  }, [
    trig,
    props.navigation.getParam('id'),
    props.navigation.getParam('name'),
  ]);

  function postComment() {
    if (input) {
      Axios.get('/auth/user/me')
        .then(res => {
          Axios.post('/comments', {
            userId: res.data.id,
            taskId: props.navigation.getParam('id'),
            content: input,
          })
            .then(res => {
              if (res.status === 200) {
                Alert.alert('success');
                //trigger();
              }
            })
            .catch(err => setError('There was an error. Please try again.'));
        })
        .catch(err => {
          console.log(err);
          setError('There was an error. Please try again.');
        });
    } else {
      Alert.alert('Empty comment');
    }
  }

  function trigger() {
    setTrig(!trig);
  }

  function updateComments(data) {
    console.log(data);
    setComments([...comments, data]);
  }

  async function addResource() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      var formData = new FormData();
      formData.append('file', {
        uri: res.uri,
        name: res.name,
        type: res.type
      });
Axios.get('/auth/user/me').then(
  res => {
    Axios.post(
      "/task_resources/" +
        parseInt(res.data.id) +
        "/" +
        props.navigation.getParam('id'),
      formData
    )
      .then(res => {
        if (res.status === 200) {
          Alert.alert("Success")
          trigger()
        }
      })
      .catch(err => {
        Alert.alert("Error")
      });
  }
).catch(err => console.log(err))

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  return (
    <Swiper
      showsButtons={false}
      dotStyle={{display: 'none'}}
      activeDotStyle={{display: 'none'}}>
      <View>
        <ScrollView style={{marginLeft: '4%', marginRight: '4%'}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              backgroundColor: 'green',
              padding: '3%',
              marginTop: 5,
              marginBottom: 5,
            }}>
            Swipe to see the discussion
          </Text>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', color: 'gray'}}>About</Text>
            <View style={{flexGrow: 1}} />
            <EditAboutModal 
              trigger={trigger}  
              taskId={props.navigation.getParam('id')} />
          </View>

          <View style={{paddingTop: '2%', paddingBottom: '2%'}}>
            <Text style={{marginBottom: 10}}>{taskData.description}</Text>
          </View>

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{fontWeight: 'bold', color: 'gray'}}>Resources</Text>
            <View style={{flexGrow: 1}} />
            <FIcon
              name="plus"
              size={25}
              style={{color: 'gray'}}
              onPress={addResource}
            />
          </View>
          <View>
            {taskResources.length > 0 ? 
              taskResources.map(resource => (
                <ResourceItem
                  name={resource.uri.split('/')[5]}
                  createdAt={resource.addedOn}
                />
              ))
             : (
              <Text
                style={{
                  textAlign: 'center',
                  color: 'gray',
                  marginTop: 30,
                  marginBottom: 30,
                }}>
                No resources
              </Text>
            )}
          </View>

          <View
            style={{
              display: 'flex',
              marginTop: 20,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{fontWeight: 'bold', color: 'gray'}}>Assignees</Text>
            <View style={{flexGrow: 1}} />

            <AddAssigneeModal
              trigger={trigger}
              taskId={props.navigation.getParam('id')}
              groupId={props.navigation.getParam('groupId')}
            />
          </View>
          <View>
            <View style={{marginTop: 15}}>
              {assignees.map(assignee => (
                <AssigneeItem
                  fname={assignee.fname}
                  emailHash={assignee.emailHash}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={{flex: 1, marginLeft: '4%'}}>
        <Text h4>Discussion</Text>
        {error ? (
          <Text style={{textAlign: 'center', color: 'red'}}>{error}</Text>
        ) : (
          <></>
        )}
        <ScrollView>
          {comments.length > 0 ? (
            comments.map(comment => (
              <CommentItem
                fname={comment.fname}
                createdAt={comment.createdAt}
                emailHash={comment.emailHash}
                content={comment.content}
              />
            ))
          ) : (
            <Text
              style={{textAlign: 'center', paddingTop: '5%', color: 'gray'}}>
              Be the first to comment
            </Text>
          )}
        </ScrollView>
        <View style={{height: 50}}>
          <Input
            placeholder="Write message"
            rightIcon={
              <Icon name="chevron-right" size={30} onPress={postComment} />
            }
            onChangeText={text => setInput(text)}
          />
        </View>
      </View>
    </Swiper>
  );
};

Task.navigationOptions = ({navigation}) => {
  function addToOutlook() {}

  function showActivity() {}

  function deleteTask() {
    Axios.delete('/tasks/' + navigation.getParam('id'))
      .then(res => {
        Alert.alert('Task Deleted');
      })
      .catch(err => console.log(err));
  }

  return {
    title: navigation.getParam('name'),
    headerStyle: {backgroundColor: '#06A1C1'},
    headerTitleStyle: {color: 'white', fontWeight: 'bold'},
    headerRight: (
      <PopupMenu
        color="white"
        actions={['Add to Outlook', 'See activity', 'Delete task']}
        onPress={(eventName, index) => {
          if (eventName !== 'itemSelected') return;
          if (index === 0) {
            addToOutlook();
          }
          if (index === 1) {
            showActivity();
          }
          if (index === 2) {
            deleteTask();
          }
        }}
      />
    ),
  };
};
export default Task;
