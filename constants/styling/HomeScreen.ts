import {StyleSheet} from 'react-native';
import {darkText, darkCard} from './colors/colors';

export const HomeStyle = StyleSheet.create({
    ImageWrap: {
        width: '100%',
        height: '100%',
        marginTop: 25,
        alignItems: 'center',
    },
    LikeStyling: {
        position: 'absolute',
        right: 30,
        bottom: 20,
        display: 'flex',
        flexWrap: 'wrap'
    },
    LikeText: {
        fontSize: 17,
        marginLeft: 10,
      color: darkText
    },
    LikeWrap: {
      width: 60,
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
        justifyContent: 'center',
    },
    TextContainer: {
        width: '100%',
        maxWidth: 360,
        marginHorizontal: 'auto',
        textAlign: 'center',
        height: 'auto',
        backgroundColor: darkCard,
        flexWrap: 'wrap',
        borderRadius: 10,
        marginBottom: 10,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20,
        flexDirection: 'row'
    },
    QuoteText: {
        fontSize: 16,
        width: '100%',
        fontFamily: 'avenirRegular',
        textAlign: 'center',
        justifyContent: 'center',
         color: '#e2e2e2',
        lineHeight: 30
    },
    AuthorText: {
        fontSize: 16,
        fontFamily: 'avenirBold',
        textAlign: 'center',
        marginTop: 20,
        color: '#868686',
        justifyContent: 'center',
        lineHeight: 20
    },
    Logout: {
        height: 60,
        width: 120,
        backgroundColor: '#ff0000'
    },
    Image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 15
    }
})
