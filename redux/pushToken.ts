import { createSlice } from '@reduxjs/toolkit'
import * as types from './types/userTypes';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {Platform} from 'react-native';
const initialState: types.token = {
    token: '',
    routeName: ''
}

export const tokenSlice = createSlice({
    name: 'token',
    initialState: initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        routeName: (state, action) => {
            state.routeName = action.payload;
        }
    },
})

export async function registerForPushNotifications() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {}
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}

// Action creators are generated for each case reducer function
export const { setToken, routeName } = tokenSlice.actions

export default tokenSlice.reducer
