import React, {useState} from 'react';
import {
    View, Text,
    TouchableOpacity,
    SafeAreaView, ImageBackground,
    TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator, Platform
}
    from 'react-native';
import {RequestStyle} from '../constants/styling/Request';
import {ChatStyle} from '../constants/styling/ChatScreen';
import {AntDesign} from '@expo/vector-icons';
import {useAuth} from '../components/Auth';
import {LoginSignupStyle} from '../constants/styling/loginScreen';
import {darkText} from '../constants/styling/colors/colors';
import {auth, db} from '../constants/firebase/firebase';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const RequestScreen = ({navigation}: any) => {

    const {logout} = useAuth();
    const membersReducer = useSelector((state: RootState) => state.membersReducer)
    const [activeInput, setActiveInput] = useState({
        problem: false
    })

    const [inputValues, setInputValues] = useState({
        problem: '',
    })

    const inputFocus = {
        problemBox: activeInput.problem ? RequestStyle.activeProblemBox : RequestStyle.problemBox
    }

    async function handleLogout() {
        await logout();
        await navigation.replace('Login')
    }

    const inputValuesHandler = (name: string) => {
        return (value: string) => {
            setInputValues({...inputValues, [name]: value})
        }
    }

    const submitHandler = () => {
        if (!inputValues.problem.length) {
            return alert('Please fill the form in order to submit')
        } else {
             db
                .collection('users')
                .doc(currentMember[0].data.id)
                .update({
                    requestedForm: {
                        issue: inputValues.problem,
                        requested: true
                    }
                })
        }
    }

    let currentMember = membersReducer.members.filter((member) => {
        const value = auth.currentUser?.email
        return member.data.email === value
    })

    if (currentMember.length === 0) {
        return <></>
    }


    return (
                <>
            <SafeAreaView style={ChatStyle.BackNav}>
                <Text style={ChatStyle.BackText}>Request Volunteer</Text>
                <TouchableOpacity onPress={handleLogout} style={ChatStyle.iconWrap}>
                    <AntDesign style={ChatStyle.iconStyle} name={'logout'} color={'#FF000'} size={25}/>
                    <Text style={ChatStyle.LogoutText}>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
            <ImageBackground style={LoginSignupStyle.image} source={require('../assets/bg.png')}>
                {!currentMember[0].data.requestedForm.requested ?
                    <>
                    <View pointerEvents={'none'} style={RequestStyle.container}>
                        <Text style={RequestStyle.heading}>Filling the form will help us to provide you a better experience, and help the volunteer understand you better.</Text>
                    </View>
                    <View style={RequestStyle.formWrap}>
                        <View style={RequestStyle.inputWrap}>
                            <TextInput
                                autoCorrect={false}
                                onChangeText={inputValuesHandler('problem')}
                                value={inputValues.problem}
                                multiline = {true}
                                numberOfLines = {5}
                                onFocus={() => setActiveInput({...activeInput, problem: true})}
                                onBlur={() => setActiveInput({...activeInput, problem: false})}
                                style={inputFocus.problemBox}
                                placeholderTextColor={darkText}
                                placeholder='Tell us about your issue'/>
                        </View>
                        <View style={RequestStyle.SubmitButton}>
                            <TouchableOpacity onPress={submitHandler}>
                                <Text style = {RequestStyle.SubmitInner}>Submit</Text>
                            </TouchableOpacity >
                        </View>
                    </View>
                    </>
                    :
                    currentMember[0].data.spokenTo === true ?
                        <View pointerEvents={'none'} style={RequestStyle.thankContainer}>
                            <Text style={RequestStyle.thankyou}>A volunteer has already initiated a conversation with you.</Text>
                        </View>
                        :
                    <View pointerEvents={'none'} style={RequestStyle.thankContainer}>
                        <Text style={RequestStyle.thankyou}>Thank you {auth?.currentUser?.displayName}, a volunteer will message you soon.</Text>
                    </View>
                }

            </ImageBackground>
            </TouchableWithoutFeedback>
                    </>
    );
};

export default RequestScreen;
