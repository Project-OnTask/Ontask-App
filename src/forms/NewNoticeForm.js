import React,{ useState } from 'react';
import {View, Alert} from 'react-native'
import {Input,Text,Card,Button} from 'react-native-elements'
import Axios from 'axios';

const NewNoticeForm = props => {
    const [title,setTitle] = useState("")
    const [isSubmitting,setSubmitStatus] = useState(false)
    const [content,setContent] = useState("")
    const [error,setError] = useState("")
    
    function createNotice(){
        setSubmitStatus(true)
        setError("")
        Axios.get('/auth/user/me').then(res => {
            Axios.post('/notices',{
                userId: res.data.id,
                groupId: props.groupId,
                title: title,
                content: content
            }).then(res => {
                if(res.status === 200){
                    Alert.alert("New notice created")
                    props.onFormSubmit()
                }
                else{
                    setError("An error occured. Please try again")
                    setSubmitStatus(false)
                }
            })
        }).catch(err => {
            console.log(err)
            setError("An error occured. Please try again.")
            setSubmitStatus(false)
        })
    }

    return (
        <View>
            <Text h4 style={{fontWeight: "bold",marginLeft: 10,paddingBottom: 10}}>New Announcement</Text>
            {error ? <Text style={{textAlign: "center",color: "red"}}>{error}</Text> : <></>}
     <Input
     label="Title"
     blurOnSubmit={true}
     inputContainerStyle={{
        marginTop: 10,
        borderWidth: 1,
        height: 40,
        borderRadius: 10,
        borderBottomColor: "black",
        borderColor: "black"
      }}
     onChangeText={text => setTitle(text)}
  placeholder=''
/>

<Input
inputContainerStyle={{padding: "2%",borderWidth: 1,borderRadius: 10,borderColor: "gray"}}
     label=""
  placeholder='Compose your notice here..'
  multiline={true}
  textAlignVertical="top"
  numberOfLines={8}
  onChangeText={text => setContent(text)}
  blurOnSubmit={true}
/>

<Button
  containerStyle={{marginTop: 10,width: "95%",marginLeft: 10}}
  title="Add Announcement"
  disabled={isSubmitting}
  onPress={createNotice}
/>
        </View>
    );
};

export default NewNoticeForm;