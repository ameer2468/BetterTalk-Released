import React, {useState, useEffect, useCallback} from 'react';
import "firebase/firestore";
import "firebase/auth";
import Login from './screens/login';
import SignUp from './screens/signUp';
import ChatScreen from './screens/ChatScreen';
import HomeContent from './screens/homeContent';
import * as Sentry from "@sentry/react-native";
import * as Font from 'expo-font';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {StyleSheet,View, AsyncStorage} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import {Platform, SafeAreaView} from 'react-native';
import {HomeTabs} from './constants/navigation/HomeStack';
import CustomStatusBar from './components/CustomStatusBar';
import AndroidStatusBar from './components/AndroidStatusBar';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {auth} from './constants/firebase/firebase';
import store, {RootState} from './redux/store';
import { LogBox } from 'react-native';
import VolunteerTabs from './constants/navigation/VolunteerTabs';
import {AuthProvider} from './components/Auth';
import  {fetchAllData} from './redux/members';
import OnBoarding from './screens/OnBoarding';
import EmailVerify from './screens/emailVerify';
import Welcome from './components/Welcome';
import MessageContent from "./screens/MessagesContent";
import RequestScreen from "./screens/RequestScreen";

LogBox.ignoreLogs(['Setting a timer']);

const LoginStack = createStackNavigator();

const LoginStackScreen = () => {
  return (
      <LoginStack.Navigator
          mode={'card'}
          screenOptions={{
              headerShown: false,
          }}
      >
        <LoginStack.Screen name="Login" component={Login}/>
        <LoginStack.Screen name="SignUp" component={SignUp}/>
      </LoginStack.Navigator>
  )
}

export const AppStack = createStackNavigator();

export const AppStackScreen = () => {
    return (
        <AppStack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
                <HomeStack.Screen name="Login" component={LoginStackScreen}/>
                <HomeStack.Screen name={'Home'} component={HomeStackScreen}/>
                <HomeStack.Screen name={'Chat'} component={ChatScreen}/>
                <HomeStack.Screen name={'Request'} component={RequestScreen}/>
                <HomeStack.Screen name={'Messages'} component={MessageContent}/>
        </AppStack.Navigator>
    )
}

const VerifyStack = createStackNavigator();

const VerifyStackScreen = () => {
    return (
        <VerifyStack.Navigator screenOptions={{headerShown: false}}>
            <VerifyStack.Screen name='Verify' component={EmailVerify}/>
            <VerifyStack.Screen name={'Home'} component={HomeContent}/>
        </VerifyStack.Navigator>
    )
}

/*Home Info*/

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {

    const membersReducer = useSelector((state: RootState) => state.membersReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllData())
    }, []);

    const currentMember = membersReducer.members.filter((member: any) => {
        const value = auth.currentUser?.email as any
        return member.data.email === value
    })


    const TabCheck = currentMember.length === 0 ? <></> : currentMember[0].data.isVolunteer ? <VolunteerTabs/> : <HomeTabs/>

    return (
        <>
            {auth.currentUser?.emailVerified ? TabCheck : <VerifyStackScreen/>}
            </>
    )
}

export default function App () {
    Sentry.init({
        dsn: "https://3fd3d1d741574cafa54606a6a58c0fd0@o936473.ingest.sentry.io/5886849",
        enableNative: false
    });

    const [appIsReady, setAppIsReady] = useState(false);
    const [isFirstLaunch, setIsFirstLaunch] = useState<any>(null);

    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Pre-load fonts, make any API calls you need to do here
                await Font.loadAsync({
                    avenirRegular: require('./assets/fonts/Metropolis-Regular.otf'),
                    avenirBold: require('./assets/fonts/Metropolis-Bold.otf')
                })
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare().then();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (value === null) {
                AsyncStorage.setItem('alreadyLaunched', 'true')
                setIsFirstLaunch(true)
            } else {
                setIsFirstLaunch(false)
            }
        })
    }, [])



    if (!appIsReady) {
        return null;
    }

  return (
      <AuthProvider>
          <Provider store={store}>
              {
                  <NavigationContainer theme={DarkTheme}>
                      <View onLayout={onLayoutRootView}/>
                      <SafeAreaView style={statusStyle.topSafeArea}/>
                      {Platform.OS === 'ios' ?
                          <CustomStatusBar barStyle={'light'}
                                           backgroundColor={'#643EFF'}/> :
                          <AndroidStatusBar barStyle={'light'} backgroundColor={'#643EFF'}/>
                      }
                      <HomeStack.Navigator mode={'card'} screenOptions={{headerShown: false}}>
                          {isFirstLaunch ?
                              <>
                              <AppStack.Screen name="OnBoarding" component={OnBoarding}/>
                                  <HomeStack.Screen name="Login" component={LoginStackScreen}/>
                                  <HomeStack.Screen name={'Home'} component={HomeStackScreen}/>
                                  <HomeStack.Screen name={'Chat'} component={ChatScreen}/>
                              </> :
                          !isFirstLaunch && !auth ? <HomeStack.Screen name={"Welcome"} component={AppStackScreen}/> :
                              <>
                                  <HomeStack.Screen name="Login" component={LoginStackScreen}/>
                                  <HomeStack.Screen name={'Home'} component={AppStackScreen}/>
                                  <HomeStack.Screen name={'Chat'} component={ChatScreen}/>
                              </>
                          }
                      </HomeStack.Navigator>
                  </NavigationContainer>
              }
          </Provider>
      </AuthProvider>
  );
}

const statusStyle = StyleSheet.create({
    topSafeArea: {
        flex: 0,
        backgroundColor: '#643EFF'
    }
})

