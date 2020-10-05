import * as firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDxtYXNVrIGtprdNcQARuk2Ab21wjY4vzE",
    authDomain: "petsharing-373a9.firebaseapp.com",
    databaseURL: "https://petsharing-373a9.firebaseio.com",
    projectId: "petsharing-373a9",
    storageBucket: "petsharing-373a9.appspot.com",
    messagingSenderId: "475196042626",
    appId: "1:475196042626:web:9608005809ab52129bf39b"
 };

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();