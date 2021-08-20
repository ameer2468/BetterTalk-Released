import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import postsReducer from './posts';
import membersReducer from './members';
import tokenReducer from './pushToken';

const store = configureStore({
    reducer: {
        postsReducer,
        membersReducer,
        tokenReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>

export default store
