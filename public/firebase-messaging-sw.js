importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBh2CcAAw8PGtZ9skhutqfFfHCHSfd8rfA",
    authDomain: "fire-shopping-1ba1f.firebaseapp.com",
    projectId: "fire-shopping-1ba1f",
    storageBucket: "fire-shopping-1ba1f.appspot.com",
    messagingSenderId: "178484470084",
    appId: "1:178484470084:web:c7c27985462fd29f1e7711"
});

const messaging = firebase.messaging();

