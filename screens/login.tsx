import React, {useEffect, useState} from 'react';
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
    ActivityIndicator
} from 'react-native';
import {LoginSignupStyle} from '../constants/styling/loginScreen';
import {auth} from '../constants/firebase/firebase';
import {Platform} from 'react-native';
import {useAuth} from '../components/Auth';
import {darkText} from '../constants/styling/colors/colors';

const Login = ({navigation}: any) => {

    const {login, currentUser} = useAuth();
    const [loading, setLoading] = useState<boolean>(false);


    const [activeInput, setActiveInput] = useState({
        email: false,
        password: false
    })
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const handleSubmit = async () => {
        const email = inputValues.email;
        const password = inputValues.password;
        if (!inputValues.email.length || !inputValues.password.length) {
            return Alert.alert('Error', 'Please fill in all fields', [{text: 'Okay', style: 'default'}])
        }
            try {
                await setLoading(true);
                await login(email, password)
                await navigation.replace('Home')
            } catch (err) {
                alert(err)
            } finally {
                setLoading(false)
            }
    }
    const inputValuesHandler = (name: string) => {
        return (value: string) => {
            setInputValues({...inputValues, [name]: value})
        }
    }

    /*Focus styling logic*/

    const inputFocus = {
        emailBox: activeInput.email ? LoginSignupStyle.activeInputBox : LoginSignupStyle.inputBox,
        passwordBox: activeInput.password ? LoginSignupStyle.activePasswordBox : LoginSignupStyle.inputBox
    }

    return (
        <>
            {currentUser === null &&
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <View style={LoginSignupStyle.container}>
                    <ImageBackground style={LoginSignupStyle.image} source={require('../assets/bg.png')}>
                        <View style={LoginSignupStyle.LoginWrap}>
                            <View style={LoginSignupStyle.titleWrap}>
                                <Text style={LoginSignupStyle.title}>
                                    Hello
                                    <View style={LoginSignupStyle.waveWrap}>
                                        <Image style={LoginSignupStyle.wave} source={require('../assets/waveIcon.png')}/>
                                    </View>
                                </Text>
                            </View>
                            <View style={LoginSignupStyle.LoginBoxWrap}>
                                <View style={LoginSignupStyle.inputWrap}>
                                    <TextInput
                                        onChangeText={inputValuesHandler('email')}
                                        value={inputValues.email}
                                        style={inputFocus.emailBox}
                                        onFocus={() => setActiveInput({...activeInput, email: true})}
                                        onBlur={() => setActiveInput({...activeInput, email: false})}
                                        placeholderTextColor={darkText}
                                        placeholder='Email'/>
                                </View>
                                <View style={LoginSignupStyle.inputWrap}>
                                    <TextInput
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        onChangeText={inputValuesHandler('password')}
                                        value={inputValues.password}
                                        onSubmitEditing={handleSubmit}
                                        style={inputFocus.passwordBox}
                                        onFocus={() => setActiveInput({...activeInput, password: true})}
                                        onBlur={() => setActiveInput({...activeInput, password: false})}
                                        placeholderTextColor={darkText}
                                        placeholder='Password'/>
                                </View>
                            </View>
                            {/*{error.status && <Text style={LoginSignupStyle.errorMessage}>{Object.values(error.message[1])}</Text>}*/}
                            <View style={LoginSignupStyle.LoginButton}>
                                <TouchableOpacity onPress={handleSubmit}>
                                    <Text style = {LoginSignupStyle.LoginInner}>
                                        {loading ?
                                            <View style={LoginSignupStyle.loadingSpinnerWrap}>
                                                <ActivityIndicator style={Platform.OS === 'ios' ? LoginSignupStyle.iosLoadingSpinner : ''} size={'small'} color={'#FFFFFF'}/>
                                            </View>
                                            : 'Login'}
                                    </Text>
                                </TouchableOpacity >
                            </View>
                        </View>
                        <View style={{marginTop: 80}}>
                            <Text style={LoginSignupStyle.signText}>No account?</Text>
                            <Text onPress={() => navigation.navigate('SignUp')} style={LoginSignupStyle.signUp}>Sign up</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
            }
            </>
    )
}

export default Login;
