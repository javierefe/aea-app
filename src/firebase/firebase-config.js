import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDfuUP3Dgf1iMTTzEtDyoCb7V5O_hJD3LM",
    authDomain: "react-app-journal-fe040.firebaseapp.com",
    projectId: "react-app-journal-fe040",
    storageBucket: "react-app-journal-fe040.appspot.com",
    messagingSenderId: "510452301797",
    appId: "1:510452301797:web:e7106a1833b07d33b9b90c"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }