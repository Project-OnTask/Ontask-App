import React, {useState, useRef} from 'react';
import {View, StyleSheet, Alert, Image} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import PhoneInput from 'react-native-phone-input';
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';

const Signup = props => {
  const [err, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [btnText, setBtnText] = useState('Sign up');
  const [disabled, setDisabled] = useState(false);
  const [mobile, setMobile] = useState('');
  const phone = useRef(null);

  const showError = () => {
    Alert.alert('Please fill all required fields');
  };

  const setToken = async token => {
    await AsyncStorage.setItem('token', token).then(async val => {
      setDisabled(false)
      props.navigation.navigate('Dashboard');
    });
  };

  const signUp = () => {
    if (
      firstName.length === 0 ||
      firstName === undefined ||
      mobile.length === 0 ||
      mobile === undefined
    ) {
      showError();
    } else {
      setDisabled(true);
      setBtnText('Signing you up..');
      axios
        .post('/auth/signup/mobile', {
          fname: firstName,
          mobile: mobile,
        })
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            axios
              .post('/auth/signin/mobile', {
                email: mobile,
                password: mobile,
              })
              .then(res => {
                Alert.alert(res.data.accessToken)
                setToken(res.data.accessToken);
              });
            // this.props.navigation.navigate('VerifyMobile',{
            //   userId: res.data.userId,
            //   mobile: this.state.mobile,
            //   reqId: res.data.requestId
            // })
          }
        })
        .catch(err => {
          console.log(err);
          setError('An error occured. Please try again');
          setDisabled(false)
          setBtnText('Sign up');
          throw err;
        });
    }
  };

  return (
    <View style={styles.container}>
                <Image
          style={{width: 150, height: 150}}
          source={require('../assets/logo.png')}
        />
      <Text style={styles.error}>{err}</Text>
      <Input
        label="First Name"
        errorStyle={{color: 'red'}}
        onChangeText={name => setFirstName(name)}
      />

      <Text h5 style={styles.mobileLabel}>
        Mobile Number
      </Text>
      <PhoneInput
        ref={phone}
        style={styles.phoneInput}
        onChangePhoneNumber={number => setMobile(number)}
      />
      <Button
        title={btnText}
        loading={disabled}
        disabled={disabled}
        buttonStyle={styles.signUpBtn}
        titleStyle={styles.signUpBtnText}
        onPress={signUp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: '8%',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '4%',
    color: 'gray',
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  phoneInput: {
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: '8%',
    marginBottom: '7%',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  signUpBtn: {
    width: '80%',
  },
  signUpBtnText: {
    marginRight: '25%',
  },
});

export default Signup;
