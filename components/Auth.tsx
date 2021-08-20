import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth} from '../constants/firebase/firebase';

const AuthContext = createContext<any>({})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}: any) {

    const [currentUser, setCurrentUser] = useState<any>()

    function signup(email: string, password: string) {
       return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
