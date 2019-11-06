import React,{ useEffect} from 'react';
import {View, StyleSheet,FlatList,Dimensions,ScrollView,SafeAreaView} from 'react-native';
import Header from '../components/Header';
import {Text, List, ListItem} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const Dashboard = props => {
  let list = [
    {
      name: 'Total',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President',
    },
    {
      name: 'Completed',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
    {
        name: 'In progress',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
      {
        name: 'Overdue',
        avatar_url:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman',
      },
  ];

  useEffect(() => { 
    props.navigation.setParams({ 
        headerMode: 'none'
    }) 
}, [])
const taskdata = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  return (
    <SafeAreaView>
        <Header navigation={props.navigation} name="OnTask"/>
        <ScrollView style={{marginTop: 50}}>
      <Text h3 style={{marginLeft: "4%",marginBottom: "5%" }}>Dashboard</Text>
      <View style={styles.summary}>

        <Progress.Circle
          size={100}
          style={{padding: "2%"}}
          progress={0.6}
          thickness={7}
          animated={false}
        />
        <View style={{flexGrow: 1}}></View>
        <FlatList
        style={{marginLeft: "2%"}}
        data={list}
        renderItem={({ item }) => <Text>
            {item.name}
        </Text>}
        keyExtractor={item => item.id}
      />
      </View>
      

      <View style={{marginTop: "5%" }}>
  <Text h4 style={{marginLeft: "4%",marginBottom: "5%" }}>This year</Text>
  <LineChart
    data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Sep","Oct","Nov","Dec"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={200}
    yAxisLabel={"%"}
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {

      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      //borderRadius: 16
    }}
  />
</View>
        
      <View>
          <Text h4 style={{marginLeft: "4%",marginBottom: "2%" }}>Tasks overview</Text>
          <PieChart
  data={taskdata}
  width={Dimensions.get("window").width}
  height={220}
  chartConfig={{
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {

    }
  }}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="15"
  absolute
/>
      </View>
      </ScrollView>
    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  summary: {
    display: 'flex',
    flexDirection: 'row',
},
});

export default Dashboard;
