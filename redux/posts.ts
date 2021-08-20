import { createSlice } from '@reduxjs/toolkit'
import * as types from './types/userTypes';
import axios from 'axios';
import {db} from '../constants/firebase/firebase';

const initialState: types.posts = {
    posts: [],
    appPosts: []
}

export const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
       fetchPosts: (state, action) => {
           state.posts = action.payload;
       },
        appPosts: (state, action) => {
           state.appPosts = action.payload;
        }
    },
})

// export const postsFetch = () => (dispatch: (arg0: { payload: any; type: string; }) => any) => {
//     const source = axios.CancelToken.source();
//     const fetchData = async () => {
//         try {
//             await axios.get('https://type.fit/api/quotes', {
//                 cancelToken: source.token,
//             })
//                 .then(async (data) => {
//                     const length = await data.data.slice(0, 100)
//                     await dispatch(fetchPosts(length))
//                         length.map((post: any, index: string) => {
//                             db.collection('posts')
//                                 .doc(index.toString())
//                                 .set({
//                                     author: post.author,
//                                     text: post.text,
//                                     like: post.like,
//                                     usersLiked: [],
//                                     id: index
//                                 })
//                         })
//                     }).catch((error) => {
//                 })
//         } catch (error) {
//             if (axios.isCancel(error)) {
//                 //cancelled
//             } else {
//                 throw error;
//             }
//         }
//     }
//     fetchData().then()
//     return () => source.cancel();
// }

// Action creators are generated for each case reducer function
export const { fetchPosts, appPosts } = postSlice.actions

export default postSlice.reducer
