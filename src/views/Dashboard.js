import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';
import {Text, List, ListItem} from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle';
import PusherObject from '../utils/PusherObject';
import Axios from 'axios';
import {BackHandler} from 'react-native';

const Dashboard = props => {
  const [totalCount, setTotalCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [groupCount, setGroupCount] = useState(0);
  const [feedItems, setFeedItems] = useState([]);
  const [groups, setGroups] = useState(0);

  useEffect(() => {
    props.navigation.setParams({
      headerMode: 'none',
    });

    Axios.get('/auth/user/me')
      .then(res => {
        Axios.get('/user/' + res.data.id + '/tasks/count')
          .then(res => setTotalCount(res.data))
          .catch(err => console.log(err));

        Axios.get('/user/' + res.data.id + '/tasks/completed/count')
          .then(res => setCompletedCount(res.data))
          .catch(err => console.log(err));

        Axios.get('/user/' + res.data.id + '/tasks/overdue/count')
          .then(res => setOverdueCount(res.data))
          .catch(err => console.log(err));

        Axios.get('/user/' + res.data.id + '/groups/count')
          .then(res => setGroupCount(res.data))
          .catch(err => console.log(err));

        Axios.get('/user/' + res.data.id + '/groups')
          .then(res => setGroups(res.data))
          .catch(err => console.log(err));

        Axios.get('/user/' + res.data.id + '/u_notifications')
          .then(res => {
            setFeedItems({feedItems: res.data});
          })
          .catch(err => console.log(err));

        Axios.get('/' + res.data.id + '/groups')
          .then(res => {
            setGroups(res.data);
            res.data
              .map((group, index) => {
                const chatChannel = PusherObject.subscribe(
                  'group_' + group.groupId,
                );
                chatChannel.bind('new_activity', data => updateFeed);
              })
              .catch(err => console.log(err));

        Axios.get('/user/' + res.data.id + '/u_notifications')
              .then(res => {
                setFeedItems(res.data);
              })
              .catch(err => console.log(err));
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => console.log(err));
  }, []);

  function updateFeed(data) {
    setFeedItems([...feedItems, JSON.parse(data)]);
  }

  const styles = StyleSheet.create({
    container: {
      marginLeft: '4%',
      marginRight: '4%',
    },
    summary: {display: 'flex', flexDirection: 'row', marginBottom: '3%'},
    groupOverview: {display: 'flex', justifyContent: 'center'},
  });

  return (
    <>
      <Header navigation={props.navigation} name="OnTask" />
      <ScrollView style={{marginTop: 55}}>
        <View style={styles.container}>
          {/* Task summary goes here */}
          <View style={styles.summary}>
            <View
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '50%',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '4%',
                }}>
                <Text style={{width: 85, fontSize: 16, color: 'gray'}}>
                  Total{' '}
                </Text>
                <Text style={{fontSize: 16, color: 'gray'}}>{totalCount}</Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '4%',
                }}>
                <Text style={{width: 85, fontSize: 16, color: 'gray'}}>
                  Completed{' '}
                </Text>
                <Text style={{fontSize: 16, color: 'gray'}}>
                  {completedCount}
                </Text>
              </View>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '4%',
                }}>
                <Text style={{width: 85, fontSize: 16, color: 'gray'}}>
                  Overdue{' '}
                </Text>
                <Text style={{fontSize: 16, color: 'gray'}}>
                  {overdueCount}
                </Text>
              </View>
            </View>
            <View>
              <View style={{marginLeft: '36%'}}>
                <ProgressCircle
                  percent={
                    totalCount === 0 ? 0 : (completedCount / totalCount) * 100
                  }
                  radius={55}
                  borderWidth={8}
                  color="#08A522"
                  shadowColor="#999"
                  bgColor="#fff">
                  <Text style={{fontSize: 18}}>
                    {totalCount === 0
                      ? '0%'
                      : `${(completedCount / totalCount) * 100}%`}
                  </Text>
                </ProgressCircle>
              </View>
            </View>
          </View>

          <Text h4 style={{marginBottom: '3%'}}>
            My Day
          </Text>
          {feedItems.length > 0 ? (
            feedItems.map(feedItem => {
              return (
                <FeedItem
                  id={feedItem.id}
                  description={
                    feedItem.description || feedItem.activity.description
                  }
                  createdAt={feedItem.createdAt || feedItem.activity.createdAt}
                />
              );
            })
          ) : (
            <View>
              <Text
                style={{
                  padding: '5%',
                  paddingLeft: 0,
                  color: 'gray',
                  textAlign: 'center',
                }}>
                No recent activity
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;
