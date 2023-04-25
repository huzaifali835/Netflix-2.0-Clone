import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBJM5UtE97oNzFIGa7DkGB7x4V3_zWHxJI",
    authDomain: "netflix-2-clone-9ea54.firebaseapp.com",
    projectId: "netflix-2-clone-9ea54",
    storageBucket: "netflix-2-clone-9ea54.appspot.com",
    messagingSenderId: "100561477212",
    appId: "1:100561477212:web:c580f32dedab9b6ee55099"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;