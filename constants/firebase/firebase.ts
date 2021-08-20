import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
    firebase.firestore().settings({experimentalForceLongPolling: true})
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
