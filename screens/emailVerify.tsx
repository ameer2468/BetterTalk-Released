import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {verifyStyle} from '../constants/styling/emailVerify';
import {auth} from '../constants/firebase/firebase';


const EmailVerify = ({navigation}: any) => {

    const confirmVerify = () => {
       return auth?.currentUser?.reload().then(() => {
          if (auth?.currentUser?.emailVerified === false) {
              return alert('You have not verified')
          } else {
              navigation.replace('Home')
          }
       })
    }

    return (
        <View style={verifyStyle.container}>
            <View style={verifyStyle.box}>
                <Text style={verifyStyle.heading}>Email Verification</Text>
                <Text style={verifyStyle.text}>Please check your email for verification. Once you have verified, please click the button.</Text>
                <TouchableOpacity onPress={confirmVerify}>
                    <View style={verifyStyle.buttonWrap}>
                        <Text style={verifyStyle.button}>Verified</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EmailVerify;
