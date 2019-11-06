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
        <Card
        title="New Announcement"
        titleStyle={{textAlign: "left"}}>
            {error ? <Text style={{textAlign: "center",color: "red"}}>{error}</Text> : <></>}
     <Input
     label="Title"
     onChangeText={text => setTitle(text)}
  placeholder=''
/>

<Input
     label=""
  placeholder='Compose your notice here..'
  multiline={true}
  onChangeText={text => setContent(text)}
  blurOnSubmit={true}
  numberOfLines={2}
/>

<Button
  containerStyle={{marginTop: 10}}
  title="Add Announcement"
  disabled={isSubmitting}
  onPress={createNotice}
/>
        </Card>
    );
};

export default NewNoticeForm;