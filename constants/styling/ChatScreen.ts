import {StyleSheet} from 'react-native';
import {BackNav, darkCard, darkText} from './colors/colors';

export const ChatStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    MessageInput: {
        backgroundColor: darkCard,
        paddingVertical: 8,
        fontSize: 16,
        width: '82%',
        paddingLeft: 20,
        color: '#eeeeee',
        borderRadius: 50
    },
    UserTyping: {
      position: "absolute",
      bottom: 120,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    TypingText: {
      color: 'white',
      fontSize: 50,
    },
    sendButton: {
      backgroundColor: '#551ef8',
        padding: 15,
        marginLeft: 10,
        borderRadius: 40
    },
    MainInfo: {
       flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    messageNameUser: {
      color: '#00ff99',
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8
    },
    messageNameReceiver: {
        color: '#00eaff',
        fontSize: 15,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    time: {
        color: darkText,
        fontSize: 12,
        paddingLeft: 20,
        marginBottom: 4
    },
    receiverText: {
        color: 'white',
        fontSize: 16
    },
    MessagesContainer: {
      paddingTop: 20,
        flex: 1
    },
    receiver: {
        padding: 15,
        backgroundColor: darkCard,
        alignSelf: "flex-end",
        borderRadius: 12,
        marginRight: 15,
        marginBottom: 20,
        width: 'auto',
        position: 'relative'
    },
    sender: {
        padding: 15,
        backgroundColor: '#3b3b3b',
        alignSelf: "flex-start",
        borderRadius: 12,
        marginLeft: 15,
        marginBottom: 20,
        width: 'auto',
        position: 'relative'
    },
    MessageBackWrap: {
        width: 200,
        flexDirection: 'row',
        alignItems: 'center'
    },
    senderText: {
        color: 'white',
        fontSize: 16,
    },
    iconStyle: {
      color: 'white',
        fontSize: 20,
      marginRight: 10
    },
    MessageInputWrap: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 30,
        alignContent: 'flex-end',
    },
    MessageAndroidInputWrap: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginBottom: 35,
        alignContent: 'flex-end',
    },
    iconWrap: {
      flexDirection: 'row',
        width: 100,
        alignItems: 'center'
    },
    deliveredText: {
      alignSelf: 'flex-end'
    },
    LogoutText: {
      color: 'white'
    },
    BackNav: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: BackNav
    },
    BackText: {
        color: 'white',
        fontSize: 18,
        paddingHorizontal: 10
    }
})
