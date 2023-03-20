import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

const vapidKey = 'BNA9LU-JTDXKjlZxVP1eERCnRpA24TozqSD7LaQ23FlFV38hi0WmJZUuWczJGodL0La6LMPN-tKcxz4F5M0Q6bo'

const firebaseConfig = {
    apiKey: "AIzaSyBh2CcAAw8PGtZ9skhutqfFfHCHSfd8rfA",
    authDomain: "fire-shopping-1ba1f.firebaseapp.com",
    projectId: "fire-shopping-1ba1f",
    storageBucket: "fire-shopping-1ba1f.appspot.com",
    messagingSenderId: "178484470084",
    appId: "1:178484470084:web:c7c27985462fd29f1e7711"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging();
getToken(messaging, { vapidKey })
    .then((currentToken) => {
        if (currentToken) {
            sendToken(currentToken);
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });

const sendToken = token => {
    if (localStorage.getItem('TokenSent')) return;
    localStorage.setItem('TokenSent', '1');
}

export const db = getFirestore(app);
