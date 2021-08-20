import React, {useState} from 'react';
import uuid from 'react-native-uuid';
import {
    TextInput,
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
    Alert,
    Platform
} from 'react-native';
import {LoginSignupStyle} from '../constants/styling/loginScreen';
import {auth, db} from '../constants/firebase/firebase';
import {ActivityIndicator} from 'react-native';
import {darkText} from '../constants/styling/colors/colors';

const SignUp = ({navigation}: any) => {

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    /*Notifications*/

    const [activeInput, setActiveInput] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
    })

    const [inputValues, setInputValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const inputFocus = {
        nameBox: activeInput.name? LoginSignupStyle.activeInputBox : LoginSignupStyle.inputBox,
        emailBox: activeInput.email ? LoginSignupStyle.activeInputBox : LoginSignupStyle.inputBox,
        passwordBox: activeInput.password ? LoginSignupStyle.activePasswordBox : LoginSignupStyle.inputBox,
        confirmBox: activeInput.confirmPassword ? LoginSignupStyle.activePasswordBox : LoginSignupStyle.inputBox
    }


    const handleSubmit = async () => {
        const email = inputValues.email;
        const password = inputValues.password;
        const name = inputValues.name;
        const id = uuid.v4();
        if (!inputValues.name.length || !inputValues.email.length || !inputValues.password.length || !inputValues.confirmPassword.length) {
           return Alert.alert('Error', 'Please fill in all fields', [{text: 'Okay', style: 'default'}])
        } else if (inputValues.password !== inputValues.confirmPassword) {
            return Alert.alert('Error', 'Confirm password does not match entered password', [{
                text: 'Okay',
                style: 'default'
            }])
        }
            try {
               setError('')
                await setLoading(true)
                await auth
                    .createUserWithEmailAndPassword(email, password)
                    .then((authUser) => {
                        authUser.user?.updateProfile({
                            displayName: name,
                            photoURL: ''
                        });
                        authUser.user?.sendEmailVerification()
                        db.collection('users')
                            .doc(id as string)
                            .set({
                                    email: email,
                                    displayName: name,
                                    joinedDate: auth.currentUser?.metadata.creationTime,
                                    isVolunteer: false,
                                    id: id,
                                    spokenTo: false,
                                    pushToken: '',
                                    welcomeMessage: true,
                                    agreedToTerms: false,
                                    requestedForm: {
                                        requested: false,
                                        issue: ''
                                    },
                                },
                                {merge: true}
                            )
                    })
            } catch (err) {
                Alert.alert('Error', err.message, [{
                    text: 'Okay',
                    style: 'default'
                }])
            } finally {
                setLoading(false)
            }
    }


    const inputValuesHandler = (name: string) => {
        return (value: string) => {
            setInputValues({...inputValues, [name]: value})
        }
    }


    return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <ImageBackground style={LoginSignupStyle.image} source={require('../assets/bg.png')}>
            <View style={LoginSignupStyle.LoginWrap}>
                <View style={LoginSignupStyle.titleWrap}>
                    <Text style={LoginSignupStyle.title}>
                       Welcome
                        <View style={LoginSignupStyle.waveWrap}>
                            <Image style={LoginSignupStyle.wave} source={require('../assets/smileIcon.png')}/>
                        </View>
                    </Text>
                </View>
                <View style={LoginSignupStyle.SignUpBoxWrap}>
                    <View style={LoginSignupStyle.inputWrap}>
                        <TextInput
                            autoCorrect={false}
                            onChangeText={inputValuesHandler('name')}
                            value={inputValues.name}
                            autoCapitalize={'none'}
                            blurOnSubmit={true}
                            style={inputFocus.nameBox}
                            onFocus={() => setActiveInput({...activeInput, name: true})}
                            onBlur={() => setActiveInput({...activeInput, name: false})}
                            placeholderTextColor={darkText}
                            placeholder='Display Name'/>
                    </View>
                    <View style={LoginSignupStyle.inputWrap}>
                        <TextInput
                            autoCorrect={false}
                            autoCapitalize={'none'}
                            onChangeText={inputValuesHandler('email')}
                            value={inputValues.email}
                            blurOnSubmit={true}
                            style={inputFocus.emailBox}
                            onFocus={() => setActiveInput({...activeInput, email: true})}
                            onBlur={() => setActiveInput({...activeInput, email: false})}
                            placeholderTextColor={darkText}
                            placeholder='Email'/>
                    </View>
                    <View style={LoginSignupStyle.inputWrap}>
                        <TextInput
                            secureTextEntry={true}
                            blurOnSubmit={true}
                            onChangeText={inputValuesHandler('password')}
                            value={inputValues.password}
                            autoCapitalize={'none'}
                            onFocus={() => setActiveInput({...activeInput, password: true})}
                            onBlur={() => setActiveInput({...activeInput, password: false})}
                            placeholderTextColor={darkText}
                            style={inputFocus.passwordBox}
                            placeholder='Password'/>
                    </View>
                    <View style={LoginSignupStyle.inputWrap}>
                        <TextInput
                            secureTextEntry={true}
                            blurOnSubmit={true}
                            onChangeText={inputValuesHandler('confirmPassword')}
                            value={inputValues.confirmPassword}
                            style={inputFocus.confirmBox}
                            autoCapitalize={'none'}
                            placeholderTextColor={darkText}
                            onFocus={() => setActiveInput({...activeInput,confirmPassword: true})}
                            onBlur={() => setActiveInput({...activeInput, confirmPassword: false})}
                            placeholder='Confirm Password'/>
                    </View>
                </View>
                    <View style={LoginSignupStyle.LoginButton}>
                        <TouchableOpacity disabled={loading} onPress={handleSubmit}>
                            <Text style = {LoginSignupStyle.LoginInner}>
                                {loading ?
                                    <View style={LoginSignupStyle.loadingSpinnerWrap}>
                                        <ActivityIndicator style={Platform.OS === 'ios' ? LoginSignupStyle.iosLoadingSpinner : ''} size={'small'} color={'#FFFFFF'}/>
                                    </View>
                                    : 'Register'}
                            </Text>
                        </TouchableOpacity >
                    </View>
            </View>
                    <View style={{marginTop: 80}}>
                        <Text style={LoginSignupStyle.signText}>Have an account?</Text>
                        <Text onPress={() => navigation.goBack()} style={LoginSignupStyle.signUp}>Login</Text>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
    )
}

export default SignUp;
