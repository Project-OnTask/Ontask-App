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
import Axios from 'axios';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const Dashboard = props => {
  const [totalCount, setTotalCount] = useState(0);
  const [pieChartData,setPieChartData] = useState([])
  const [completedCount, setCompletedCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [groupCount, setGroupCount] = useState(0);
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

        Axios.get('/user/' + res.data.id + '/groups/count').then(res =>
          setGroupCount(res.data),
        );

        Axios.get('/user/' + res.data.id + '/groups').then(res =>
          setGroups(res.data),
        );
      })
      .catch(err => console.log(err));
  }, []);

  const styles = StyleSheet.create({
    container: {
      marginLeft: '4%',
      marginRight: '4%',
    },
    summary: {display: 'flex', flexDirection: 'row', marginBottom: '3%'},
    groupOverview: {display: 'flex', justifyContent: 'center'},
  });

  const data = [
    {
      name: 'Seoul',
      count: 21500000,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      count: 2800000,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Beijing',
      count: 527612,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'New York',
      count: 8538000,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Moscow',
      count: 11920000,
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <>
      <Header navigation={props.navigation} name="OnTask" />
      <ScrollView style={{marginTop: 55}}>
        <View style={styles.container}>
          <Text h4 style={{marginBottom: '3%'}}>
            Dashboard
          </Text>

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
                  marginBottom: '2%',
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
                  marginBottom: '2%',
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
                  marginBottom: '2%',
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

       </View>
      </ScrollView>
    </>
  );
};

export default Dashboard;
