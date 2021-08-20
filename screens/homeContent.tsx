import React, {useRef, useEffect, useState} from 'react';
import {
    Text,
    ImageBackground,
    FlatList,
    SafeAreaView, TouchableOpacity,
} from 'react-native';
import {LoginSignupStyle} from '../constants/styling/loginScreen';
import {useAuth} from '../components/Auth';
import {ChatStyle} from '../constants/styling/ChatScreen';
import PostItem from '../components/PostItem';
import {AntDesign} from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import {auth, db} from '../constants/firebase/firebase';
import Welcome from '../components/Welcome';
import * as Notifications from 'expo-notifications';
import {registerForPushNotifications, routeName, setToken} from '../redux/pushToken';

const HomeContent = ({navigation, route}: any) => {

    const {logout} = useAuth();
    const membersReducer = useSelector((state: RootState) => state.membersReducer);
    const postsReducer = useSelector((state: RootState) => state.postsReducer);
    const tokenReducer = useSelector((state: RootState) => state.tokenReducer);
    const [notification, setNotification] = useState<any>(false);
    const notificationListener = useRef<any>();
    const responseListener = useRef<any>();
    const dispatch = useDispatch();

    useEffect(() => {
        registerForPushNotifications().then(token => {
                dispatch(setToken(token))
        });
        auth.currentUser?.reload();
        if (currentUser[0].data.pushToken === "") {
            db.collection('users')
                .doc(currentUser[0].id)
                .update({
                    pushToken: tokenReducer.token
                }).then().catch(err => console.log(err))
        } else if (tokenReducer.token === undefined || "") {
            return;
        } else if (currentUser[0].data.pushToken.length > 15) {
            return;
        }
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener;

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [tokenReducer.token]);



    const RenderItem = ({item}: any) => {
       return (
           <>
               {<PostItem item={item}/>}
           </>
       )
    }
    async function handleLogout() {
            await logout();
            await navigation.replace('Login')
    }


    // const memoizedValue = useMemo(() => RenderItem, [postsReducer.appPosts]);
    const currentUser = membersReducer.members.filter((member) => {
        return member.data.email === auth.currentUser?.email
    })


    return (
        <>
            <SafeAreaView style={ChatStyle.BackNav}>
                <Text style={ChatStyle.BackText}>Inspiring Quotes</Text>
                <TouchableOpacity onPress={handleLogout} style={ChatStyle.iconWrap}>
                    <AntDesign style={ChatStyle.iconStyle} name={'logout'} color={'#FF000'} size={25}/>
                    <Text style={ChatStyle.LogoutText}>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
                <ImageBackground style={LoginSignupStyle.image} source={require('../assets/bg.png')}>
                    {currentUser.length === 0 ? <></> : currentUser[0].data.welcomeMessage ?
                        <Welcome userData={currentUser[0].data} welcomeState={currentUser[0].data.welcomeMessage}/> :
                        <FlatList
                        style={{marginVertical: 20}}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={true}
                        fadingEdgeLength={300}
                        renderItem={RenderItem}
                        windowSize={4}
                        maxToRenderPerBatch={8}
                        keyExtractor={(item: any, index: any) => index.toString()}
                        data={postsReducer.appPosts}/>}
                </ImageBackground>
            </>
    )
}

export default HomeContent;
