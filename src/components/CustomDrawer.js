import React, { Component } from "react";
import { NavigationActions } from "react-navigation";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import axios from "axios";

export default class drawerContentComponents extends Component {
  state = {
    fname: "",
    lname: "",
    emailHash: ""
  };

  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  componentDidMount() {
    axios
      .get("/auth/user/me")
      .then(async res => {
        axios
          .get("/users/" + res.data.id)
          .then(res => {
            this.setState({
              fname: res.data.fname,
              lname: res.data.lname ? res.data.lname : "",
              emailHash: res.data.emailHash
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      axios
        .get("/auth/user/me")
        .then(async res => {
          axios
            .get("/users/" + res.data.id)
            .then(res => {
              this.setState({
                fname: res.data.fname,
                lname: res.data.lname ? res.data.lname : "",
                emailHash:this.state.emailHash
              });
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={{width: "100%"}}>
          <TouchableOpacity
          onPress={this.navigateToScreen("Profile")}
          style={{
            width: "100%",
            backgroundColor: "#1B8BD8",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          >
            <Image
            style={{
              borderRadius: 100,
              margin: 20,
              marginLeft: 10,
              width: 65,
              height: 65,
            }}
            source={{ uri: `https://www.gravatar.com/avatar/${this.state.emailHash}?d=retro&s=80` }}
          />
          <Text style={{ fontSize: 15, color: "white" }}>
            {this.state.fname + " " + this.state.lname}
          </Text>
          </TouchableOpacity>
        </View>
 
        <View style={styles.screenContainer}>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "Dashboard"
                ? styles.activeBackgroundColor
                : null,
            ]}
          >
            <Icon name="home" size={18} style={{ width: 35 }} />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "Dashboard"
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.navigateToScreen("Dashboard")}
            >
              Dashboard
            </Text>
          </View>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "Tasks"
                ? styles.activeBackgroundColor
                : null,
            ]}
          >
            <Icon name="tasks" size={18} style={{ width: 35 }} />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "Tasks"
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.navigateToScreen("Tasks")}
            >
              Tasks
            </Text>
          </View>
          <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "Groups"
                ? styles.activeBackgroundColor
                : null,
            ]}
          >
            <Icon name="group" size={18} style={{ width: 35 }} />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "Groups"
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.navigateToScreen("Groups")}
            >
              Groups
            </Text>
          </View>
          {/* <View
            style={[
              styles.screenStyle,
              this.props.activeItemKey == "Settings"
                ? styles.activeBackgroundColor
                : null,
            ]}
          >
            <Icon name="cog" size={18} style={{ width: 35 }} />
            <Text
              style={[
                styles.screenTextStyle,
                this.props.activeItemKey == "Settings"
                  ? styles.selectedTextStyle
                  : null,
              ]}
              onPress={this.navigateToScreen("Settings")}
            >
              Settings
            </Text>
          </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  headerContainer: {
    height: 100,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    backgroundColor: "#1B8BD8",
  },
  headerText: {
    paddingTop: 30,
    fontSize: 30,
    color: "#fff8f8",
  },
  screenContainer: {
    width: "100%",
    marginTop: "5%"
  },
  screenStyle: {
    height: 30,
    padding: 25,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  screenTextStyle: {
    fontSize: 17,
    marginLeft: 20,
    textAlign: "center",
  },
  selectedTextStyle: {
    fontWeight: "bold",
    color: "#1B8BD8",
  },
  activeBackgroundColor: {
    // backgroundColor: "#1B8BD8",
  },
});