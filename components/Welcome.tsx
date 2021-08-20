import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {darkCard} from '../constants/styling/colors/colors';
import {auth, db} from '../constants/firebase/firebase';
import {Button} from 'react-native-elements';

const Welcome = ({welcomeState, userData}: any) => {

    const TextStyle = StyleSheet.create({
        header: {
            fontSize: 24,
            color: 'white',
            fontFamily: 'avenirBold',
        },
        Modal: {
            backgroundColor: darkCard
        },
        center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: darkCard,
        },
        text: {
            textAlign: 'center',
            paddingHorizontal: 30,
            lineHeight: 25,
            fontSize: 16,
            fontFamily: 'avenirRegular',
            color: 'white',
        },
        subText: {
            textAlign: 'center',
            paddingHorizontal: 30,
            fontSize: 16,
            lineHeight: 25,
            marginTop: 15,
            color: 'white',
            fontFamily: 'avenirRegular',
        },
        centerSubText: {
            textAlign: 'center',
            fontSize: 16,
            lineHeight: 25,
            paddingHorizontal: 30,
            marginVertical: 15,
            color: 'white',
            fontFamily: 'avenirRegular',
        },
        sub: {
            fontSize: 16,
            lineHeight: 25,
            marginTop: 10,
            fontFamily: 'avenirBold',
            color: '#3eefff'
        },
        button: {
            width: 120,
            padding: 15,
            textAlign: 'center',
            color: 'white',
            fontFamily: 'avenirBold',
        },
        buttonWrap: {
            backgroundColor: '#6e14ff',
            marginTop: 30,
            borderRadius: 8,
        }
    })

    const closeWelcome = () => {
            db
                .collection('users')
                .doc(userData.id)
                .update({
                    welcomeMessage: false
                })
    }

    return (
       <Modal style={TextStyle.Modal}
           animationType={'slide'}
           transparent={true}
           visible={welcomeState}>
           <View style={TextStyle.center}>
               <Text style={TextStyle.header}>{`Welcome ${userData.displayName},`}</Text>
               <Text style={TextStyle.sub}>A message from the Creator & Developer</Text>
               <Text style={TextStyle.subText}>I created this app to genuinely help people at no cost, free, forever. We will never charge you to speak to a volunteer about your life difficulties. </Text>
               <Text style={TextStyle.centerSubText}>Feel free to add me on discord: Mister Slyther#0296 with any ideas and enquiries.</Text>
               <Text style={TextStyle.text}>Make sure to request for a volunteer through the app and they will message you.</Text>
               <TouchableOpacity onPress={closeWelcome}>
                   <View style={TextStyle.buttonWrap}>
                       <Text style={TextStyle.button}>Next</Text>
                   </View>
               </TouchableOpacity>
           </View>
       </Modal>
    );
};

export default Welcome;
