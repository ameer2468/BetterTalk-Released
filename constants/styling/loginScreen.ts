import {StyleSheet} from 'react-native';
import {darkText, darkCard, LoginSign, LoginSignTitle} from './colors/colors';

export const LoginSignupStyle = StyleSheet.create({
    LoginWrap: {
        width: '100%',
        maxWidth: '90%',
        paddingLeft: 20,
        paddingRight: 20
    },
    waveWrap: {
        paddingLeft: 20,
        height: 30,
        marginBottom: 10
    },
    loadingSpinnerWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    iosLoadingSpinner: {
       position: 'absolute',
        left: 150,
        top: 5
    },
    wave: {
        width: 40,
        height: 40
    },
    container: {
        flex: 1,
        backgroundColor: darkCard,
        alignItems: 'center',
        justifyContent: 'center',
    },
    LoginButton: {
        backgroundColor: '#643EFF',
        borderRadius: 10,
        marginTop: 20,
        position: 'relative'
    },
    splashBg: {
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    image: {
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    inputWrap: {
        height: 60,
        width: '100%',
    },
    LoginBoxWrap: {
        height: 155,
        justifyContent: 'space-evenly'
    },
    SignUpBoxWrap: {
        height: 290,
        justifyContent: 'space-evenly'
    },
    errorMessage: {
        height: 'auto',
        marginVertical: 10,
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',
        width: '100%',
        color: 'red'
    },
    LoginInner: {
         fontFamily: 'avenirBold',
         color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 20,
        paddingBottom: 20,
    },
    titleWrap: {
        width: '100%',
    },
    title: {
        fontSize: 39,
        color: LoginSignTitle,
        marginRight: 10,
        marginBottom: 40,
        justifyContent: 'flex-end',
        fontFamily: 'avenirBold'
    },
    signText: {
      color: darkText,
        fontSize: 16,
        fontFamily: 'avenirRegular'
    },
    signUp: {
      color: LoginSign,
      fontSize: 25,
      fontFamily: 'avenirBold',
      marginTop: 15,
      textAlign: 'center'
    },
    inputBox: {
        borderWidth: 1,
        borderColor: '#4e4e4e',
        color: darkText,
        borderRadius: 10,
        fontSize: 16,
        marginVertical: 0,
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    activeInputBox: {
        borderWidth: 1,
        borderColor: '#643EFF',
        color: '#929292',
        borderRadius: 10,
        fontSize: 16,
        marginVertical: 0,
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    activePasswordBox: {
        borderWidth: 1,
        borderColor: '#643EFF',
        color: '#929292',
        borderRadius: 10,
        fontSize: 16,
        marginVertical: 0,
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    }
})
