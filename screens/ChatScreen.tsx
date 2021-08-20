import React, {useRef, useState, useLayoutEffect} from 'react';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {
    ImageBackground, Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {ChatStyle} from '../constants/styling/ChatScreen';
import {auth} from '../constants/firebase/firebase';
import {LoginSignupStyle} from '../constants/styling/loginScreen';
import {darkText} from '../constants/styling/colors/colors';
import {useDispatch, useSelector} from 'react-redux';
import {useTimeHook} from '../constants/hooks/time';
import {RootState} from '../redux/store';
import {chatData, sendMessageData} from '../redux/members';
import {routeName} from '../redux/pushToken';
import * as Notifications from 'expo-notifications';
import { useChatHook } from '../constants/hooks/chat';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const ChatScreen = ({navigation, route}: any) => {

    const [input, setInput] = useState<string>('');
    const timeHook = useTimeHook();
    const chatHook = useChatHook();
    const {chatInfo, id} = route.params;
    const dispatch = useDispatch();
    const membersReducer = useSelector((state: RootState) => state.membersReducer)
    console.log(chatInfo)

    let scrollRef: any = useRef()

    useLayoutEffect(() => {
        dispatch(chatData(id))
    }, []);

    return (
        <ImageBackground style={LoginSignupStyle.image} source={require('../assets/bg.png')}>
       <View style={ChatStyle.container}>
           <TouchableOpacity activeOpacity={0.8} onPress={() => {
               navigation.goBack()
               dispatch(routeName(''))
               // dispatch(chatData('clear data'))
           }}
           >
               <SafeAreaView style={ChatStyle.BackNav}>
                   <View style={ChatStyle.MessageBackWrap}>
                       <Ionicons style={{paddingLeft: 20}} name={'chevron-back'} color={'#ffffff'} size={30}/>
                       <Text style={ChatStyle.BackText}>{chatHook.getChatName(id)[0]}</Text>
                   </View>
               </SafeAreaView>
           </TouchableOpacity>
           <ScrollView ref={scrollRef}
                       onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}>
               <View style={ChatStyle.MessagesContainer}>
                   {membersReducer.messages.map(({id, data}: any) => {
                       return (
                           data.email === auth.currentUser?.email ? (
                               <View key={id} style={ChatStyle.receiver}>
                                   <View style={ChatStyle.MainInfo}>
                                       <Text style={ChatStyle.messageNameUser}>{data.displayName}</Text>
                                       <Text style={ChatStyle.time}>{data.timestamp === null ? <Text>00:00</Text> : timeHook.formatSeconds(data.timestamp)}</Text>
                                       {data.delivered ? <Ionicons style={{paddingLeft: 8, paddingBottom: 5}} name={'checkmark-done'} color={'#ffffff'} size={15}/>
                                           :
                                           <Ionicons style={{paddingLeft: 8, paddingBottom: 5}} name={'checkmark-outline'} color={'#ffffff'} size={15}/>
                                       }
                                   </View>
                                   <Text style={ChatStyle.receiverText}>{data.message}</Text>
                               </View>
                           ) : (
                               <View key={id} style={ChatStyle.sender}>
                                   <View style={ChatStyle.MainInfo}>
                                       <Text style={ChatStyle.messageNameReceiver}>{data.displayName}</Text>
                                       <Text style={ChatStyle.time}>{data.timestamp === null ? <Text>00:00</Text> : timeHook.formatSeconds(data.timestamp)}</Text>
                                   </View>
                                   <Text style={ChatStyle.receiverText}>{data.message}</Text>
                               </View>
                           )
                       )
                       })}
               </View>
           </ScrollView>
           <KeyboardAvoidingView
           behavior={Platform.OS === 'ios' ? "padding" : "height"}
           keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 15}
           >
        <View style={Platform.OS === 'ios' ? ChatStyle.MessageInputWrap : ChatStyle.MessageAndroidInputWrap}>
            <TextInput value={input} onChangeText={text => {
                chatHook.setUserTyping(true)
                setInput(text)
            }} style={ChatStyle.MessageInput} placeholderTextColor={darkText} placeholder={'Message...'}/>
            <TouchableOpacity style={ChatStyle.sendButton} disabled={input.length < 1} onPress={() =>  {
                console.log('clicked')
                chatHook.sendMessage(input, chatInfo, id, chatInfo.pushToken)
                setInput("");
            }}>
                <MaterialIcons name='send' color={'#ffffff'} size={20}/>
            </TouchableOpacity>
        </View>
           </KeyboardAvoidingView>
       </View>
        </ImageBackground>
    )
}

export default ChatScreen;
