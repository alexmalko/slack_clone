import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAQqpoW_uUyUgqy8VWCPG-U5jtjElXfoAU",
  authDomain: "spack-a6e6b.firebaseapp.com",
  projectId: "spack-a6e6b",
  storageBucket: "spack-a6e6b.appspot.com",
  messagingSenderId: "907439169483",
  appId: "1:907439169483:web:1b437c7d131bacfcfe604e",
  measurementId: "G-N9633PDFDY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const storage = firebaseApp.storage();

const storageRef = storage.ref();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db, storage, storageRef };
