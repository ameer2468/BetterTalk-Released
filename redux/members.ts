import { createSlice } from '@reduxjs/toolkit'
import * as types from './types/userTypes';
import {auth, db} from '../constants/firebase/firebase';
import {appPosts} from './posts';
import firebase from "firebase/app";
import "firebase/firestore";
import {useTimeHook} from "../constants/hooks/time";

const initialState: types.members = {
    members: [],
    chats: [],
    messages: []
}

export const membersSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        fetchMembers: (state, action) => {
            state.members = action.payload;
        },
        fetchChats: (state, action) => {
            state.chats = action.payload
        },
        fetchMessages: (state, action) => {
            state.messages = action.payload
        }
    },
})

export const chatData = (id: any) => (dispatch: any) => {
        db
            .collection("chats")
            .doc(id)
            .collection('messages')
            .orderBy('firebasetime', 'asc')
            .onSnapshot((snapshot: { docs: any[]; }) => dispatch(fetchMessages(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))
            )))
}


export const sendMessageData = (id: string, message: string, delivered: boolean) => {
    const timeHook = useTimeHook();
    const messageTime =  timeHook.convertTimeToSeconds()
    db.collection("chats").doc(id)
        .collection("messages").add({
        timestamp: messageTime,
        firebasetime: firebase.firestore.FieldValue.serverTimestamp(),
        message: message,
        displayName: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        delivered: delivered
    })
}


export const fetchAllData = () => (dispatch: any) => {
     db
                .collection('users')
                .onSnapshot((snapshot: { docs: any[]; }) => {
                    dispatch(fetchMembers((snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        }))
                    )))});
    db
        .collection('posts')
        .onSnapshot((snapshot: { docs: any[]; }) => {
            dispatch(appPosts((snapshot.docs.map(doc => ({
                data: doc.data()
            })))))
        })
    db
        .collection('chats')
        .onSnapshot((snapshot: { docs: any[]; }) => (
           dispatch(fetchChats(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        )))
}

// Action creators are generated for each case reducer function
export const { fetchMembers, fetchChats, fetchMessages } = membersSlice.actions

export default membersSlice.reducer
