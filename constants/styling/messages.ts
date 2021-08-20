import {StyleSheet} from 'react-native';
import {darkCard, darkText} from './colors/colors';

export const MessageStyle = StyleSheet.create({
    MessageWrap: {
        flex: 1,
        backgroundColor: darkCard,
        paddingVertical: 30,
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    ChatItem: {
        width: '100%',
        flex: 1,
        position: 'relative'
    },
    CardWrap: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
    },
    noChatsText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'avenirRegular',
        textAlign: 'center',
        marginTop: 20,
        width: '100%',
        maxWidth: 200,
        lineHeight: 30,
    },
    noChatsWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noChats: {
        color: '#ffffff',
        fontSize: 30,
        fontFamily: 'avenirBold'
    },
    trash: {
      alignItems: 'flex-end',
        width: '10%',
        position: 'absolute',
        right: 20
    },
    MessageHeader: {
      width: '100%',
        textAlign: 'center',
        backgroundColor: '#643EFF',
        paddingVertical: 30,
        fontFamily: 'avenirBold',
        marginBottom: 20,
        color: 'white',
        fontSize: 25,
    },
    MessageRecord: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    AvatarContainer: {
        width: 40,
        height: 40,
        marginRight: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    MessagePreview: {
        fontFamily: 'avenirRegular',
        fontSize: 14
    },
    MessageTime: {

    },
    ImageMessageWrap: {
        flexDirection: 'row'
    },
    Username: {
        fontFamily: 'avenirBold',
        fontSize: 19,
        marginBottom: 7,
    },
    AvatarImage: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center'
    }
})
