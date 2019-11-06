import React from 'react';
import {View, TouchableOpacity} from 'react-native'
import {Text} from 'react-native-elements'
import Header from '../components/Header'
import PopupMenu from '../components/DotBtnMenu'

function TaskItem (props){
    // onPopupEvent = (eventName, index) => {
    //     if (eventName !== 'itemSelected') return
    //     if (index === 0){
    //       if(this.props.role==="admin"){
    //         this.removeAdmin()
    //       }
    //       else{
    //         this.setAdmin()
    //       }
    //     } 
    //     else {
    
    //         this.removeFromGroup()   }
    //   }

    return (
        <TouchableOpacity onPress={() => props.navigation.navigate("Task")}>
            <View style={{display: "flex",flexDirection: "row",elevation: 5,alignItems: "center",height: 50}}>
            <View style={{padding: "3%",}}>
                <Text h5 style={{fontSize: 19}}>Task Name</Text>
                <Text>Last Activity</Text>
            </View>
            <View style={{flexGrow: 1}}></View>
            <PopupMenu 
        actions={['Revoke access']} 
        onPress={(event,index) => {}}
         />
        </View>
        </TouchableOpacity>
    )
}

const Tasks = props => {
    return (
        <View>
             <Header navigation={props.navigation} name="My Tasks"/>
             <View style={{marginTop: 60}}>
             <Text h4 style={{paddingLeft: "3%"}}>Tasks</Text>
            <TaskItem navigation={props.navigation}/>
            <TaskItem navigation={props.navigation}/>
             </View>
        </View>
    );
};

export default Tasks;