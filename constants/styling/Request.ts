import {StyleSheet} from 'react-native';
import {darkCard, darkText} from './colors/colors';

export const RequestStyle = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: '90%',
        paddingLeft: 20,
        paddingRight: 20
    },
    thankContainer: {
        paddingVertical: 20,
        width: '80%',
        height: 120,
        alignItems: 'center',
        backgroundColor: darkCard,
        justifyContent: 'center',
        borderRadius: 20,
    },
    formWrap: {
        height: 155,
        width: '80%',
        marginBottom: 200
    },
    inputWrap: {
        height: 120,
        width: '100%',
        marginBottom: 10
    },
    SubmitButton: {
        backgroundColor: '#643EFF',
        borderRadius: 10,
        marginTop: 50,
        position: 'relative'
    },
    SubmitInner: {
        fontFamily: 'avenirBold',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 20,
        paddingBottom: 20,
    },
    problemBox: {
        borderWidth: 1,
        borderColor: '#4e4e4e',
        color: darkText,
        borderRadius: 10,
        fontSize: 16,
        marginVertical: 0,
        height: 120,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        textAlignVertical: 'top'
    },
    activeProblemBox: {
        borderWidth: 1,
        borderColor: '#643EFF',
        color: '#929292',
        borderRadius: 10,
        textAlignVertical: 'top',
        fontSize: 16,
        marginVertical: 0,
        height: 120,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },
    heading: {
        color: darkText,
        fontFamily: 'avenirBold',
        lineHeight: 25,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30
    },
    thankyou: {
        color: darkText,
        fontFamily: 'avenirBold',
        lineHeight: 25,
        fontSize: 16,
        textAlign: 'center',
    }
})
