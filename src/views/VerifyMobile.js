import React, { useRef} from 'react';
import { View,StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import CodeInput from "react-native-confirmation-code-input";

const VerifyMobile = () => {
    const code = useRef(null)

    function _onFulfill(code) {
        console.log(code)
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.content}>
            <Text h5 style={styles.instruction}>We have sent a confirmation code to your mobile.Please enter it here</Text>

          <CodeInput
          ref={code}
          secureTextEntry
          activeColor="rgba(49, 180, 4, 1)"
          inactiveColor="rgba(49, 180, 4, 1.3)"
          autoFocus={false}
          ignoreCase={true}
          codeLength={6}
          size={40}
          onFulfill={(code) => _onFulfill(code)}
          codeInputStyle={styles.codeInputStyle}
        />  

<Text h6 style={styles.instruction}>You will be directed to the app {'\n'} as soon as you finished entering the code</Text>
          
            </View>  
            </View>
     
    );
};

const styles = StyleSheet.create({  
  container: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  instruction: {
      color: "gray",
      textAlign: 'center',
      alignSelf: 'stretch',
      marginBottom: "8%",
      fontSize: 15,
  },
  codeInputStyle: { 
      borderWidth: 1.5 
  },
  content: {
      paddingTop: "35%",
  }
});

export default VerifyMobile;