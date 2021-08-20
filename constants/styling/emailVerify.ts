import {StyleSheet} from 'react-native';
import {darkCard, darkText} from './colors/colors';

export const verifyStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#111111',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'avenirBold',
    },
    button: {
        width: 120,
        padding: 10,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'avenirBold',
    },
    buttonWrap: {
        backgroundColor: '#6e14ff',
        marginTop: 30,
        borderRadius: 8,
    },
    box: {
       backgroundColor: darkCard,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: '80%',
        borderRadius: 20,
    },
    text: {
        textAlign: 'center',
        lineHeight: 25,
        marginTop: 10,
        fontSize: 14,
        fontFamily: 'avenirRegular',
        color: 'white',
    }
})
