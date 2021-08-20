import {useState} from "react";
import { Keyboard } from "react-native"
import {sendMessageData} from '../../redux/members';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useAuth} from '../../components/Auth';

export function useChatHook() {

    const membersReducer = useSelector((state: RootState) => state.membersReducer)
    const {currentUser} = useAuth();
    const [userTyping, setUserTyping] = useState(false);
    const [delivered, setDelivered] = useState(false);

    function getChatName(id: string): any[] {
        const filterChats = membersReducer.chats.filter((value) => {
             return value.id === id;
         })
         return Object.values(filterChats.length === 0 ? '' : filterChats[0].data).filter((value: any) => {
             return value.length < 30 && value !== currentUser.displayName;
         })
     }

    const sendPushNotification = async (inputMessage: string, token: string, currentUser: { displayName: string; }) => {
            const message = {
                to: token,
                sound: 'default',
                title: currentUser.displayName,
                body: inputMessage,
                data: { someData: 'goes here' },
            };
            if (message.to === undefined) {
                return;
            }
            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(message),
            }).then().catch(err => console.log(err))
        }

        const token = (chatInfo: Object) => {
        const chatData = Object.values(chatInfo).filter((value: any) => {
            return value.length < 30;
        })
        const userInfo = chatData.filter((value) => {
            return value !== currentUser.displayName;
        })
        return membersReducer.members.filter((user) => {
            return user.data.displayName === userInfo[0]
        })
    }

        function sendMessage(message: string, chatInfo: Object, id: string, token: string) {
            Keyboard.dismiss()
            sendPushNotification(message, token, currentUser).then(() => setDelivered(true))
            sendMessageData(id, message, delivered)
            setUserTyping(false);
        }

return {
    sendPushNotification,
    sendMessage,
    token,
    getChatName,
    setUserTyping,
    userTyping,
    delivered
}

}
