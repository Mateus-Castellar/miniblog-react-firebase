import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9splxczr-7kYG9r89yUbWYS90aMnNoUA",
  authDomain: "miniblog-41c0c.firebaseapp.com",
  projectId: "miniblog-41c0c",
  storageBucket: "miniblog-41c0c.appspot.com",
  messagingSenderId: "1017800252201",
  appId: "1:1017800252201:web:3bea59ec4c17aefc25b538",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
