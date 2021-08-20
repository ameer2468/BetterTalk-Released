import React from 'react';
import {
    Text,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    ImageBackground, Alert
} from 'react-native';
import ChatItem from '../components/ChatItem';
import {ChatStyle} from '../constants/styling/ChatScreen';
import {db, auth} from '../constants/firebase/firebase';
import {useAuth} from '../components/Auth';
import {AntDesign} from '@expo/vector-icons';
import {LoginSignupStyle} from '../constants/styling/loginScreen';
import {MessageStyle} from '../constants/styling/messages';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {routeName} from '../redux/pushToken';
import {RequestStyle} from "../constants/styling/Request";


const MessageContent = ({navigation}: any) => {

    const membersReducer = useSelector((state: RootState) => state.membersReducer)
    const {logout} = useAuth();
    const dispatch = useDispatch();

    const enterChat = (id: string, chatInfo: any) => {
        dispatch(routeName('Chat'))
        navigation.navigate('Chat', {
            id,
            chatInfo
        })
    }

    const currentMember = membersReducer.members.filter((value: any) => {
        return value.data.displayName === auth.currentUser?.displayName
    })
    const memberCheck = currentMember.length === 0 ? '' : currentMember[0].data.isVolunteer;

    const deleteHandler = (id: string) => {
        Alert.alert('Are you sure?',
            'You will need to make a new request if you remove this chat',
            [
            {text: 'Yes', onPress: () => {
                    db
                        .collection('chats')
                        .doc(id)
                        .delete()
                        .then().catch(err => Alert.alert('Error', err.message, [{
                        text: 'Okay',
                        style: 'default'
                    }]))
                    db
                        .collection('users')
                        .doc(id)
                        .update({
                            spokenTo: false,
                            issue: '',
                            requestedForm: {
                                requested: false
                            }
                        })
                        .then().catch(err => Alert.alert('Error', err.message, [{
                        text: 'Okay',
                        style: 'default'
                    }]))
                }
            },
            {
                text: 'Cancel',
                style: 'cancel',
            }
        ])
    }


    const ChatCheck = () => {
            return membersReducer.chats.map(({id, data}: any) => {
                if (memberCheck && data.sender === auth.currentUser?.displayName) {
                return (
                    <View key={id} style={MessageStyle.ChatItem}>
                        <ChatItem
                            id={id}
                            enterChat={() => enterChat(id, data)}
                            chatInfo={data}
                            deleteChat={() => deleteHandler(id)}
                        />
                    </View>
                )
            } else if (data.receiver === auth.currentUser?.displayName) {
                       return (
                           <View key={id} style={MessageStyle.ChatItem}>
                               <ChatItem
                                   id={id}
                                   enterChat={() => enterChat(id, data)}
                                   chatInfo={data}
                                   deleteChat={() => deleteHandler(id)}
                               />
                           </View>
                       )
                }
        })
    }

    async function handleLogout() {
        await logout();
        await navigation.replace('Login')
    }

    return (
    <>
        <SafeAreaView style={ChatStyle.BackNav}>
            <Text style={ChatStyle.BackText}>Messages</Text>
            <TouchableOpacity onPress={handleLogout} style={ChatStyle.iconWrap}>
                <AntDesign style={ChatStyle.iconStyle} name={'logout'} color={'#FF000'} size={25}/>
                <Text style={ChatStyle.LogoutText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
        <ImageBackground style={LoginSignupStyle.image} source={require('../assets/bg.png')}>
            <View style={{flex: 1, width: '100%', paddingBottom: 60}}>
                {membersReducer.chats.length === 0 ?<View style={MessageStyle.noChatsWrap}>
                    <Text style={MessageStyle.noChats}>No chats</Text>
                    <Text style={MessageStyle.noChatsText}>Make a request to talk to a volunteer!</Text>
                </View>  : (
                    <ScrollView
                        fadingEdgeLength={400}
                        style={{width: '100%'}}>
                        {ChatCheck( )}
                    </ScrollView>
                )}
            </View>
        </ImageBackground>
    </>
    )
}


export default MessageContent;
