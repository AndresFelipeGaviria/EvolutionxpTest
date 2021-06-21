import firebase from 'firebase/app';
import 'firebase/firestore';
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB2dWuH5rGpv3PtDq87D0-L9o2jNUWV6Sw",
    authDomain: "radicadosfirebase.firebaseapp.com",
    projectId: "radicadosfirebase",
    storageBucket: "radicadosfirebase.appspot.com",
    messagingSenderId: "251309282521",
    appId: "1:251309282521:web:4530829a20a51f5662dac8",
    measurementId: "G-9T8MTYTS69"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();
