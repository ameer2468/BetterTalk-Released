import React, {useState, useEffect} from 'react';
import {db, auth} from '../constants/firebase/firebase';
import {ListItem, Avatar} from 'react-native-elements';
import {darkCard, darkText} from '../constants/styling/colors/colors';
import {TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import {MessageStyle} from '../constants/styling/messages';

const ChatItem = ({id, enterChat, chatInfo, deleteChat}: any) => {

    const [chatMessages, setChatMessages] = useState<any>([]);
    const [memberInfo, setMemberInfo] = useState<any>([]);

    useEffect(() => {
        const unsubscribe = db
            .collection("chats")
            .doc(id)
            .collection("messages")
            .orderBy("firebasetime", "asc")
            .onSnapshot((snapshot: { docs: any[]; }) =>
                setChatMessages(snapshot.docs.map((doc) => doc.data()))
            );

        return unsubscribe;
    }, []);

    useEffect(() => {
        const unsubscribe = db
            .collection('users')
            .onSnapshot(snapshot => {
                 setMemberInfo(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )});
        return unsubscribe;
    }, []);

    const currentMember = memberInfo.filter((value: any) => {
        return value.data.displayName === auth.currentUser?.displayName
    })

    const lastMessage = chatMessages.length > 0 && chatMessages[chatMessages.length - 1].message;
    const memberCheck = currentMember.length === 0 ? '' : currentMember[0].data.isVolunteer;

    return (
        <ListItem containerStyle={{backgroundColor: darkCard, borderBottomWidth: 0.2, borderBottomColor: '#494949', flex: 1}} onPress={() => enterChat(id, chatInfo)} key={id} bottomDivider>
              <Avatar size={'medium'} source={require('../assets/avatar.png')}/>
                 <ListItem.Content>
                         <View style={{justifyContent: 'space-between'}}>
                             <ListItem.Title style={{fontWeight: '800', color: darkText}}>
                                 {memberCheck ? chatInfo.receiver : chatInfo.sender}
                             </ListItem.Title>
                             {chatMessages?.length > 0 && (
                                 <ListItem.Subtitle style={{color: darkText}} numberOfLines={1} ellipsizeMode="tail">
                                     {lastMessage}
                                 </ListItem.Subtitle>
                             )}
                         </View>
                         <TouchableOpacity onPress={() => deleteChat(id)} style={MessageStyle.trash}>
                             <View>
                                 <FontAwesome size={22} color={'#ffffff'} name={'trash'}/>
                             </View>
                         </TouchableOpacity>
                 </ListItem.Content>
        </ListItem>
    )
}

export default ChatItem;
