import {StyleSheet} from 'react-native';
import {darkText, darkCard} from './colors/colors';

export const MembersStyle = StyleSheet.create({
    MemberCard: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 0,
        marginHorizontal: 15,
        backgroundColor: darkCard,
        borderRadius: 20,
        paddingVertical: 13,
    },
    MemberImage: {
        width: '100%',
        maxWidth: 60,
        height: 60,
        marginVertical: 10
    },
    MemberName: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: 16,
      color: darkText,
      fontFamily: 'avenirBold'
    },
    date: {
      fontFamily: 'avenirRegular',
        lineHeight: 19,
        color: darkText,
        width: '80%',
        fontSize: 12,
        textAlign: 'center'
    },
    issue: {
        fontFamily: 'avenirRegular',
        lineHeight: 22,
        color: darkText,
        width: '80%',
        fontSize: 14,
        marginVertical: 10,
        textAlign: 'center'
    },
    ScreenWrap: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        paddingTop: 25,
        paddingLeft: 10,
        paddingRight: 10
    }
})

