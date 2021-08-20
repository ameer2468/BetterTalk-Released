import React from 'react';
import {
    TouchableOpacity,
    Text,
    FlatList,
    SafeAreaView,
    ImageBackground,
} from 'react-native';
import {ChatStyle} from '../constants/styling/ChatScreen';
import {LoginSignupStyle} from '../constants/styling/loginScreen';
import {db} from '../constants/firebase/firebase';
import {useAuth} from '../components/Auth';
import MemberItem from '../components/MemberItem';
import {AntDesign} from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';

const MembersContent = ({navigation}: any) => {

    const {currentUser} = useAuth();
    const {logout} = useAuth();
    const membersReducer = useSelector((state: RootState) => state.membersReducer)

    const therapistCheck = membersReducer.members.filter((value: any) => {
            return value.data.email !== currentUser?.email
        })


    const enterChat = (docId: any, id: string, receiver: string, chatInfo: any) => {
     db
            .collection('chats')
            .doc(id)
            .set({
                chatId: id,
                receiver: receiver,
                sender: currentUser?.displayName
            }).then().catch(err => console.log(err))
      db
            .collection('users')
            .doc(docId)
            .update({
                spokenTo: true,
            }).then().catch(err => console.log(err))

        navigation.navigate('Chat', {
            id,
            chatInfo
        })
    }

    async function handleLogout() {
        await logout();
        await navigation.replace('Login')
    }

    const renderItem = ({item}: any) => {
        return (
            item.data.requestedForm.requested === true && item.data.spokenTo === false ?
                <MemberItem
                key={item.data.id}
                id={item.data.id}
                data={item.data}
                enterChat={() => enterChat(item.id, item.data.id, item.data.displayName, item.data)}
            /> : item.data.spokenTo === true && <></>
        )
    }

    return (
        <>
            <SafeAreaView style={ChatStyle.BackNav}>
                <Text style={ChatStyle.BackText}>Members waiting to hear</Text>
                <TouchableOpacity onPress={handleLogout} style={ChatStyle.iconWrap}>
                    <AntDesign style={ChatStyle.iconStyle} name={'logout'} color={'#FF000'} size={25}/>
                    <Text style={ChatStyle.LogoutText}>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
            <ImageBackground style={LoginSignupStyle.image} source={require('../assets/bg.png')}>
                    <FlatList
                        keyExtractor={item => item.id}
                        numColumns={2}
                        data={therapistCheck}
                        renderItem={renderItem}/>
            </ImageBackground>
            </>
    )
}

export default MembersContent;
